export function time(fn, n = 1000, name = "function"){
  const start = performance.now();

  for(let i = 0; i < n; i++){
    fn();
  }
  
  const total = performance.now() - start;

  console.log("-".repeat(40));
  console.log(`Results for ${name} (${n} runs):`);
  console.log(`total: ${total.toFixed(4)} ms`);
  console.log("-".repeat(40));
}