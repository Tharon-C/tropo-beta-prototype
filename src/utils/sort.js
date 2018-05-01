export const created = arr => arr.sort((a, b) => {
  a = new Date(a.created);
  b = new Date(b.created);
  return a < b ? -1 : a > b ? 1 : 0;
});
