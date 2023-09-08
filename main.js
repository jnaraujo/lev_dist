
import { time } from './utils.js';
import jsLevenshtein from './js-levenshtein.js';


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

  // takes too long
  // time(() => {
  //   lev('kitten', 'sitting');
  //   lev('saturday', 'sunday');
  //   lev('sittin', 'sitting');
  //   lev('abacate', 'abacate');
  //   lev('abacate', 'dauoishduiahsuidh');
  // }, n, 'lev')

  time(() => {
    lev_it('kitten', 'sitting');
    lev_it('saturday', 'sunday');
    lev_it('sittin', 'sitting');
    lev_it('abacate', 'abacate');
    lev_it('abacate', 'dauoishduiahsuidh');
  }, n, 'lev_it')

  time(() => {
    jsLevenshtein('kitten', 'sitting');
    jsLevenshtein('saturday', 'sunday');
    jsLevenshtein('sittin', 'sitting');
    jsLevenshtein('abacate', 'abacate');
    jsLevenshtein('abacate', 'dauoishduiahsuidh');
  }, n, 'js-levenshtein')
}

if(process.argv[2] === '--benchmark') benchmark();