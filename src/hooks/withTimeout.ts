export function withTimeout(f: () => void, ms: number) {
  return function (this: unknown, ...args: []) {
    let id: number;
    const timer = new Promise((_, reject) => {
      id = setTimeout(() => reject(new Error("timeout")), ms);
    });
    const job = Promise.resolve().then(() => f.apply(this, args));
    return Promise.race([job, timer]).finally(() => clearTimeout(id));
  };
}
export function debounce(fn: (...args: unknown[]) => void, delay: number) {
  let id: number;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(id);

    id = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
