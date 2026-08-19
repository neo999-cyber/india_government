/*
 * browser_scan.js — run the profile scan from the Instagram tab you are already logged in to.
 *
 * WHY THIS EXISTS ALONGSIDE THE PYTHON
 *   `web_profile_info` needs a logged-in session. The Python path needs that session exported
 *   as a cookie, which means copying a live credential out of the browser and onto disk. This
 *   path borrows the session in place: nothing is extracted, nothing is stored, and there is no
 *   credential to leak or to forget to delete afterwards.
 *
 *   The Python client remains the one the ingestion worker builds on. This is the operator path
 *   for step 1, and it writes THE SAME JSONL SHAPE, so `classify.py` consumes either without
 *   knowing which produced it. If the two shapes ever drift, the classifier silently sees empty
 *   fields and reports a corpus with no food accounts in it — so the field list below is copied
 *   from `Profile.to_json()` in ig_client.py and must move with it.
 *
 * HOW TO RUN
 *   1. Open https://www.instagram.com/ in a normal logged-in tab.
 *   2. DevTools → Console. Paste this whole file, press Enter.
 *   3. igScan.pickFile()            → choose your following.json
 *      igScan.run()                 → starts; progress prints as it goes
 *      igScan.save()                → downloads profiles.jsonl
 *
 *   It is resumable in the same tab: if it stops (or you stop it with igScan.stop()), calling
 *   igScan.run() again continues from where it left off. Navigating away loses the buffer, so
 *   call igScan.save() before you close the tab — a partial file is still progress, and a
 *   re-run of the Python or this script will fill in the rest.
 *
 * PACING
 *   250–400 ms of jitter between calls, measured from the end of the previous request. ~1,288
 *   handles is therefore roughly 7–9 minutes.
 */

(() => {
  const APP_ID = '936619743392459';
  const ENDPOINT = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=';
  const ASSET_BUG = 'laser.provider/ig_business_category_subvertical';

  const state = {
    handles: [],
    results: new Map(), // handle(lowercased) -> record
    running: false,
    stopRequested: false,
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const jitter = () => 250 + Math.random() * 150;

  // Mirrors ig_client.parse_profile. Keep the two in step.
  function parseProfile(username, payload) {
    const user = payload?.data?.user;
    if (!user) throw Object.assign(new Error('empty user object'), { kind: 'ProfileNotFound' });

    let address = null;
    const raw = user.business_address_json;
    if (typeof raw === 'string' && raw.trim()) {
      try { address = JSON.parse(raw); } catch { address = { unparsed: raw }; }
    } else if (raw && typeof raw === 'object') {
      address = raw;
    }
    const count = (node) => (node && typeof node.count === 'number' ? node.count : null);

    return {
      username: user.username || username,
      ig_user_id: user.id ?? null,
      full_name: user.full_name || '',
      biography: user.biography || '',
      category_name: user.category_name ?? null,
      business_category_name: user.business_category_name ?? null,
      is_professional_account: Boolean(user.is_professional_account),
      is_business_account: Boolean(user.is_business_account),
      is_verified: Boolean(user.is_verified),
      is_private: Boolean(user.is_private),
      followers: count(user.edge_followed_by),
      following: count(user.edge_follow),
      media_count: count(user.edge_owner_to_timeline_media),
      external_url: user.external_url ?? null,
      business_address: address,
      fetched_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
      error: null,
      error_kind: null,
      raw: payload,
    };
  }

  async function fetchOne(handle, attempt = 1) {
    const response = await fetch(ENDPOINT + encodeURIComponent(handle), {
      credentials: 'include',
      headers: { 'x-ig-app-id': APP_ID, 'x-requested-with': 'XMLHttpRequest' },
    });
    const text = await response.text();

    // Throttling first — Instagram serves it as a 200 with this wording, and reading it as a
    // malformed success would keep the loop running through a throttle.
    if (response.status === 429 || /wait a few minutes/i.test(text)) {
      throw Object.assign(new Error(`throttled on ${handle}`), { kind: 'RateLimited', fatal: true });
    }
    if (response.status === 401 || response.status === 403) {
      throw Object.assign(new Error(`session rejected on ${handle}`), { kind: 'AuthError', fatal: true });
    }
    if (response.status === 404) {
      throw Object.assign(new Error(`HTTP 404`), { kind: 'ProfileNotFound' });
    }
    if (response.status === 400 && text.includes(ASSET_BUG)) {
      if (attempt === 1) { await sleep(jitter()); return fetchOne(handle, 2); }
      throw Object.assign(new Error('Instagram asset bug'), { kind: 'AssetBugError' });
    }
    if (response.status === 400) {
      throw Object.assign(new Error(`HTTP 400 — ${text.slice(0, 120)}`), { kind: 'ProfileNotFound' });
    }
    if (!response.ok) {
      throw Object.assign(new Error(`HTTP ${response.status}`), { kind: 'TransientError' });
    }
    return parseProfile(handle, JSON.parse(text));
  }

  const api = {
    /** Load handles from a downloaded following.json. */
    async pickFile() {
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = async () => {
          const text = await input.files[0].text();
          resolve(api.loadJSON(JSON.parse(text)));
        };
        input.click();
      });
    },

    /** Load handles from an already-parsed export, or a bare array of handles. */
    loadJSON(payload) {
      const entries = Array.isArray(payload)
        ? payload
        : payload.relationships_following || Object.values(payload).find(Array.isArray) || [];
      const seen = new Set();
      state.handles = [];
      for (const entry of entries) {
        let name = typeof entry === 'string' ? entry : entry?.title;
        if (!name && entry?.string_list_data?.[0]?.href) {
          name = entry.string_list_data[0].href.replace(/\/$/, '').split('/').pop();
        }
        if (!name) continue;
        name = name.trim().replace(/^@/, '');
        const key = name.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        state.handles.push(name);
      }
      console.log(`igScan: ${state.handles.length} handles loaded`);
      return state.handles.length;
    },

    stop() { state.stopRequested = true; console.log('igScan: stopping after the current call'); },

    async run() {
      if (state.running) { console.warn('igScan: already running'); return; }
      if (!state.handles.length) { console.error('igScan: load handles first — igScan.pickFile()'); return; }
      state.running = true;
      state.stopRequested = false;

      const pending = state.handles.filter((h) => !state.results.has(h.toLowerCase()));
      console.log(`igScan: ${state.results.size} done, ${pending.length} to fetch`);
      const started = Date.now();
      let ok = 0, failed = 0;

      for (let i = 0; i < pending.length; i++) {
        if (state.stopRequested) break;
        const handle = pending[i];
        try {
          state.results.set(handle.toLowerCase(), await fetchOne(handle));
          ok++;
        } catch (error) {
          if (error.fatal) {
            state.running = false;
            console.error(
              `igScan: STOPPED — ${error.message}\n` +
              `        ${state.results.size}/${state.handles.length} scanned. ` +
              `Run igScan.save() to keep what you have, then igScan.run() again later.`,
            );
            return;
          }
          // A per-profile failure becomes a record, so every handle is accounted for.
          state.results.set(handle.toLowerCase(), {
            username: handle, fetched_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
            error: error.message, error_kind: error.kind || 'IGError',
          });
          failed++;
          console.warn(`  ${handle}: ${error.kind} — ${error.message}`);
        }

        if ((i + 1) % 50 === 0 || i === pending.length - 1) {
          const rate = (i + 1) / ((Date.now() - started) / 1000);
          const left = (pending.length - i - 1) / Math.max(rate, 1e-6);
          console.log(`  [${i + 1}/${pending.length}] ok=${ok} err=${failed} ~${(left / 60).toFixed(1)} min left`);
        }
        await sleep(jitter());
      }

      state.running = false;
      console.log(
        `igScan: ${state.results.size}/${state.handles.length} scanned ` +
        `(ok=${ok}, per-profile errors=${failed}). Now run igScan.save().`,
      );
    },

    /** Download the results as JSONL — the exact shape classify.py reads. */
    save(filename = 'profiles.jsonl') {
      if (!state.results.size) { console.error('igScan: nothing to save'); return; }
      const lines = [...state.results.values()].map((r) => JSON.stringify(r)).join('\n') + '\n';
      const url = URL.createObjectURL(new Blob([lines], { type: 'application/x-ndjson' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      console.log(`igScan: wrote ${state.results.size} records to ${filename}`);
    },

    status() {
      return {
        handles: state.handles.length,
        scanned: state.results.size,
        remaining: state.handles.length - state.results.size,
        running: state.running,
      };
    },
  };

  window.igScan = api;
  console.log(
    'igScan ready.\n' +
    '  igScan.pickFile()  → choose following.json\n' +
    '  igScan.run()       → start / resume\n' +
    '  igScan.status()    → progress\n' +
    '  igScan.stop()      → pause\n' +
    '  igScan.save()      → download profiles.jsonl',
  );
})();
