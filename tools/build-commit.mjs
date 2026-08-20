#!/usr/bin/env node
import { resolveBuildCommit } from './lib/build-commit.mjs';

const A = 'a'.repeat(40);
const B = 'b'.repeat(40);
const C = 'c'.repeat(40);
const fakeGit = () => Buffer.from(C);
const assert = (condition, message) => {
  if (!condition) throw new Error(`build-commit control failed: ${message}`);
};

const vercel = resolveBuildCommit({
  env: { VERCEL_GIT_COMMIT_SHA: A, GITHUB_SHA: B },
  runGit: fakeGit,
});
assert(vercel.commit === A && vercel.source === 'VERCEL_GIT_COMMIT_SHA', 'Vercel must outrank GitHub and checkout HEAD');

const github = resolveBuildCommit({ env: { GITHUB_SHA: B }, runGit: fakeGit });
assert(github.commit === B && github.source === 'GITHUB_SHA', 'GitHub must outrank checkout HEAD');

const checkout = resolveBuildCommit({ env: {}, runGit: fakeGit });
assert(checkout.commit === C && checkout.source === 'git rev-parse HEAD', 'checkout HEAD must be the local fallback');

const absent = resolveBuildCommit({ env: {}, runGit: () => { throw new Error('no git'); } });
assert(absent.commit === 'unknown', 'a checkout without Git must say unknown');

let rejected = false;
try {
  resolveBuildCommit({ env: { VERCEL_GIT_COMMIT_SHA: 'not-a-commit' }, runGit: fakeGit });
} catch {
  rejected = true;
}
assert(rejected, 'a malformed provider commit must not fall back silently');

console.log('build-commit control OK — Vercel → GitHub → checkout priority, malformed provider SHA rejected, absent Git says unknown');
