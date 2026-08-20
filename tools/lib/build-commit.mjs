import { execSync } from 'node:child_process';

const FULL_SHA = /^[0-9a-f]{40}$/i;
const BUILD_SHA_KEYS = ['VERCEL_GIT_COMMIT_SHA', 'GITHUB_SHA'];

/**
 * Resolve the commit that an external build is publishing.
 *
 * Vercel may assemble the requested tree on a detached checkout whose `HEAD` is the base commit;
 * the Git provider variables identify the requested deployment and therefore outrank that local
 * implementation detail. A malformed declared variable is fatal: silently falling back would put
 * a plausible but false commit in the public citation contract.
 */
export function resolveBuildCommit({
  env = process.env,
  cwd,
  runGit = (options) => execSync('git rev-parse HEAD', options),
} = {}) {
  for (const key of BUILD_SHA_KEYS) {
    const value = env[key];
    if (!value) continue;
    if (!FULL_SHA.test(value)) throw new Error(`${key} is not a full 40-character Git commit`);
    return { commit: value.toLowerCase(), source: key };
  }

  try {
    const value = runGit({ cwd }).toString().trim();
    if (!FULL_SHA.test(value)) throw new Error('git rev-parse HEAD did not return a full commit');
    return { commit: value.toLowerCase(), source: 'git rev-parse HEAD' };
  } catch {
    return { commit: 'unknown', source: 'no Git commit available' };
  }
}
