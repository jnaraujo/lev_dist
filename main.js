
import { time } from './utils.js';
import jsLevenshtein from './js-levenshtein.js';
import fastLevenshtein from 'fast-levenshtein';
import { distance } from "fastest-levenshtein"


/**
 * 
 * @param {string} a 
 * @param {string} b 
 */
export function lev(a, b) {
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
export function lev_it(a, b) {
  if(a === b) return 0;
  
  const m = a.length;
  const n = b.length;

  if (m === 0) return n;
  if (n === 0) return m;
  

  const arr = Array(m + 1);
  for (let i = 0; i <= m; i++) {
    arr[i] = Array(n + 1);
  }
  
  for (let i = 0; i <= m; i++) arr[i][0] = i;
  for (let j = 0; j <= n; j++) arr[0][j] = j;

  let cost = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a.charCodeAt(i - 1) === b.charCodeAt(j - 1)) {
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

function benchmark() {
  const n = 100000;

  const testCases = [
    [
      'kitten', 'sitting'
    ],
    [
      'saturday', 'sunday'
    ],
    [
      'sittin', 'sitting'
    ],
    [
      'abacate', 'abacate'
    ],
    [
      'abacate', 'dauoishduiahsuidh'
    ],
    [
      'a', 'b'
    ],
    [
      'a', 'a'
    ],
    [
      "", ""
    ],
    [
      "dasudihasuidh9812ue97h97adhas9hd973hd", "d98as98dhjaouisdjn893289dhja9sjnda7gsdiyuasd"
    ]
  ]

  time(() => {
    testCases.forEach(([a, b]) => lev_it(a, b));
  }, n, 'lev_it')

  time(() => {
    testCases.forEach(([a, b]) => jsLevenshtein(a, b));
  }, n, 'js-levenshtein')

  time(() => {
    testCases.forEach(([a, b]) => fastLevenshtein.get(a, b));
  }, n, 'fastLevenshtein')

  time(() => {
    testCases.forEach(([a, b]) => distance(a, b));
  }, n, 'fastest Levenshtein')
}

if(process.argv[2] === '--benchmark') benchmark();