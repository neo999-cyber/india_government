'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export interface ProvenancePreview {
  id: string;
  title: string;
  whatChanged: string;
  when?: string;
  directionOfBias?: string;
  bridgeNote?: string;
  affectsDomains?: string[];
  affectsSeries?: string[];
  competingAccounts?: { holder: string; position: string }[];
  sources?: { name: string; url: string; tier?: string }[];
}

type RawProvenancePreview = Omit<ProvenancePreview, 'competingAccounts'> & {
  competingAccounts?: Array<{ holder: string; position: string } | string>;
};

/**
 * Progressive enhancement for provenance links.
 *
 * The public provenance JSON is fetched only when a reader opens a preview. The previous version
 * serialized all 127 records into every route through the root layout, including pages that never
 * linked to one. With scripting disabled, or if the request fails, the original record link remains
 * the complete route and nothing about the evidence depends on this drawer.
 */
export function ProvenanceDrawer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeRecord, setActiveRecord] = useState<ProvenancePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const recordsRef = useRef<ProvenancePreview[] | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const removeQuery = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('provenance');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const loadRecord = useCallback(async (id: string, pushState: boolean) => {
    setActiveId(id);
    setActiveRecord(null);
    setLoading(true);
    setFailed(false);
    if (pushState) {
      const url = new URL(window.location.href);
      url.searchParams.set('provenance', id);
      window.history.pushState({ provenanceDrawer: id }, '', `${url.pathname}${url.search}${url.hash}`);
    }
    try {
      if (!recordsRef.current) {
        const response = await fetch('/data/v1/provenance.json', { cache: 'force-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const raw = (await response.json()) as RawProvenancePreview[];
        recordsRef.current = raw.map((record) => ({
          ...record,
          competingAccounts: record.competingAccounts?.map((account) =>
            typeof account === 'string' ? { holder: 'Account', position: account } : account,
          ),
        }));
      }
      const record = recordsRef.current.find((item) => item.id === id) ?? null;
      if (!record) throw new Error(`Unknown provenance record ${id}`);
      setActiveRecord(record);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    if (window.history.state?.provenanceDrawer === activeId) {
      window.history.back();
      return;
    }
    removeQuery();
    setActiveId(null);
    setActiveRecord(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, [activeId, removeQuery]);

  useEffect(() => {
    const syncFromUrl = () => {
      const id = new URLSearchParams(window.location.search).get('provenance');
      if (id && /^P-\d{2,3}$/.test(id)) {
        void loadRecord(id, false);
      } else {
        setActiveId(null);
        setActiveRecord(null);
        window.requestAnimationFrame(() => returnFocusRef.current?.focus());
      }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [loadRecord]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
      if (!target || target.dataset.provenanceFull !== undefined) return;
      const match = target.getAttribute('href')?.match(/\/provenance\/(P-\d{2,3})\/?$/);
      if (!match || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocusRef.current = target;
      void loadRecord(match[1], true);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [loadRecord]);

  useEffect(() => {
    if (!activeId) return;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('.masthead, main, .foot-dir, .foot'),
    );
    background.forEach((element) => element.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => element.removeAttribute('inert'));
    };
  }, [activeId, handleClose]);

  if (!activeId) return null;

  return (
    <div className="prov-drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && handleClose()}>
      <aside
        ref={dialogRef}
        className="prov-drawer"
        role="dialog"
        aria-labelledby="prov-drawer-title"
        aria-modal="true"
        aria-busy={loading}
      >
        <div className="prov-drawer-header">
          <div className="prov-drawer-meta">
            <span className="badge badge-dispute">{activeId}</span>
            {activeRecord?.directionOfBias ? (
              <span className="badge badge-tier">BIAS: {activeRecord.directionOfBias.toUpperCase()}</span>
            ) : null}
            {activeRecord?.when ? <span className="prov-drawer-when">{activeRecord.when}</span> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="prov-drawer-close"
            onClick={handleClose}
            aria-label="Close provenance drawer"
          >
            ✕
          </button>
        </div>

        <div className="prov-drawer-content">
          {loading ? (
            <p id="prov-drawer-title" className="prov-drawer-title">Loading the dispute record…</p>
          ) : failed || !activeRecord ? (
            <>
              <h2 id="prov-drawer-title" className="prov-drawer-title">Preview unavailable</h2>
              <p className="prov-drawer-text">
                The complete record is still available at its permanent page.
              </p>
            </>
          ) : (
            <>
              <h2 id="prov-drawer-title" className="prov-drawer-title">{activeRecord.title}</h2>

              <div className="prov-drawer-section">
                <h3 className="prov-drawer-h3">What changed and what is disputed</h3>
                <p className="prov-drawer-text">{activeRecord.whatChanged}</p>
                {activeRecord.bridgeNote ? (
                  <p className="prov-drawer-bridge"><strong>Seam rule:</strong> {activeRecord.bridgeNote}</p>
                ) : null}
              </div>

              {activeRecord.competingAccounts?.length ? (
                <div className="prov-drawer-section">
                  <h3 className="prov-drawer-h3">Competing accounts ({activeRecord.competingAccounts.length})</h3>
                  <div className="prov-accounts-list">
                    {activeRecord.competingAccounts.map((account, index) => (
                      <div key={index} className="prov-account-item">
                        <strong className="prov-holder">{account.holder}</strong>
                        <p className="prov-position">{account.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeRecord.affectsSeries?.length ? (
                <div className="prov-drawer-section">
                  <h3 className="prov-drawer-h3">Affected indicator series</h3>
                  <div className="prov-series-chips">
                    {activeRecord.affectsSeries.map((id) => (
                      <Link key={id} href={`/series/${id}/`} className="prov-series-chip">{id} →</Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeRecord.sources?.length ? (
                <div className="prov-drawer-section">
                  <h3 className="prov-drawer-h3">Primary sources and archive</h3>
                  <div className="prov-sources-list">
                    {activeRecord.sources.map((source, index) => (
                      <a key={index} href={source.url} target="_blank" rel="noreferrer noopener" className="prov-source-item">
                        {source.tier ? <span className="badge badge-tier">{source.tier}</span> : null}
                        <span className="prov-source-name">{source.name}</span>
                        <span className="prov-source-ext">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="prov-drawer-footer">
          <Link data-provenance-full href={`/provenance/${activeId}/`} className="prov-full-link">
            Open full dispute record page →
          </Link>
        </div>
      </aside>
    </div>
  );
}
