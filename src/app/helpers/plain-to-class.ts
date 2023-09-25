export function plainToClass<T, V>(
  classRef: { new (...arg: any[]): T },
  entry: V
): T {
  return new classRef(entry);
}
