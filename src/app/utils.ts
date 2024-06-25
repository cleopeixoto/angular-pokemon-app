export function generateId(list: any) {
  const ids = list.map((item: any) => item.id);
  return Math.max(...ids) + 1;
}
