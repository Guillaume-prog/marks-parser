export function range(start: number, end?: number) {
  if (!end) {
    end = start;
    start = 0;
  }
  let arr = [start];
  while (start++ !== end) {
    arr.push(start);
  }
  return arr;
}
