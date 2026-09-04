import test from 'node:test';
import assert from 'node:assert/strict';
import { acceptedCompression } from '../lib/compressed-assets.mjs';
test('Komprimierung respektiert die Fähigkeiten und Ausschlüsse des Browsers', () => {
  assert.equal(acceptedCompression('gzip, deflate, br'), 'br');
  assert.equal(acceptedCompression('br;q=0,gzip;q=1'), 'gzip');
  assert.equal(acceptedCompression('gzip;q=0,br;q=0'), null);
  assert.equal(acceptedCompression('identity'), null);
  assert.equal(acceptedCompression(''), null);
  assert.equal(acceptedCompression('*;q=1,br;q=0'), 'gzip');
  assert.equal(acceptedCompression('br;q=.5,gzip;q=1'), 'gzip');
});
