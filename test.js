import { test } from 'node:test';
import assert from 'node:assert';
import { lev, lev_it } from "./main.js"
import jsLevenshtein from './js-levenshtein.js';


test("lev benchmark", () => {
  assert.strictEqual(lev('kitten', 'sitting'), 3);
  assert.strictEqual(lev('saturday', 'sunday'), 3);
  assert.strictEqual(lev('sittin', 'sitting'), 1);
  assert.strictEqual(lev('abacate', 'abacate'), 0);
  assert.strictEqual(lev('abacate', 'dauoishduiahsuidh'), 15);
})

test("lev_it benchmark", () => {
  assert.strictEqual(lev_it('kitten', 'sitting'), 3);
  assert.strictEqual(lev_it('saturday', 'sunday'), 3);
  assert.strictEqual(lev_it('sittin', 'sitting'), 1);
  assert.strictEqual(lev('abacate', 'abacate'), 0);
  assert.strictEqual(lev('abacate', 'dauoishduiahsuidh'), 15);
})

test("js-levenshtein benchmark", () => {
  assert.strictEqual(jsLevenshtein('kitten', 'sitting'), 3);
  assert.strictEqual(jsLevenshtein('saturday', 'sunday'), 3);
  assert.strictEqual(jsLevenshtein('sittin', 'sitting'), 1);
  assert.strictEqual(lev('abacate', 'abacate'), 0);
  assert.strictEqual(lev('abacate', 'dauoishduiahsuidh'), 15);
})