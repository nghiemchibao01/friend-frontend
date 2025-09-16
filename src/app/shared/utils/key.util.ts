export function createKeys<T>() {
  return new Proxy({} as any, {
    get: (_, prop: string) => prop,
  }) as { [K in keyof T]: K };
}
