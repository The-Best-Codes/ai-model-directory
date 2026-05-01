export async function mapWithConcurrency<T, R>(
  values: readonly T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  if (values.length === 0) {
    return [];
  }

  const result = new Array<R>(values.length);
  const workerCount = Math.max(1, Math.min(concurrency, values.length));
  let cursor = 0;

  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      result[index] = await mapper(values[index] as T, index);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return result;
}
