import { test } from 'node:test';
import assert from 'node:assert';
import jsLevenshtein from './js-levenshtein.js';


/**
 * 
 * @param {string} a 
 * @param {string} b 
 */
function lev(a, b) {
  const m = a.length;
  const n = b.length;

  if (m === 0) return n;
  if (n === 0) return m;
  if (a[0] === b[0]) return lev(a.slice(1), b.slice(1));

  return 1 + Math.min(
    lev(a.slice(1), b),
    lev(a, b.slice(1)),
    lev(a.slice(1), b.slice(1))
  );
}

/**
 * Code from https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_full_matrix
 * 
 * @param {string} a 
 * @param {string} b 
 */
function lev_it(a, b) {
  const m = a.length;
  const n = b.length;

  const arr = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) arr[i][0] = i;
  for (let j = 0; j <= n; j++) arr[0][j] = j;

  let cost = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if(a[i - 1] === b[j - 1]){
        cost = 0;
      } else {
        cost = 1;
      }

      arr[i][j] = Math.min(
        arr[i - 1][j] + 1,
        arr[i][j - 1] + 1,
        arr[i - 1][j - 1] + cost
      );
    }
  }

  return arr[m][n];
}



test("lev benchmark", () => {
  const n = 10000;
  for (let i = 0; i < n; i++) {
    assert.strictEqual(lev('kitten', 'sitting'), 3);
    assert.strictEqual(lev('saturday', 'sunday'), 3);
    assert.strictEqual(lev('sittin', 'sitting'), 1);
  }
})

test("lev_it benchmark", () => {
  const n = 10000;
  for (let i = 0; i < n; i++) {
    assert.strictEqual(lev_it('kitten', 'sitting'), 3);
    assert.strictEqual(lev_it('saturday', 'sunday'), 3);
    assert.strictEqual(lev_it('sittin', 'sitting'), 1);
  }
})

test("js-levenshtein benchmark", () => {
  const n = 10000;
  for (let i = 0; i < n; i++) {
    assert.strictEqual(jsLevenshtein('kitten', 'sitting'), 3);
    assert.strictEqual(jsLevenshtein('saturday', 'sunday'), 3);
    assert.strictEqual(jsLevenshtein('sittin', 'sitting'), 1);
  }
})