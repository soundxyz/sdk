export class CacheUtils {
  private static cache = new Map<string, Promise<unknown>>()

  public static async getOrSetCache<T>(key: string, fetchData: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key) as Promise<T>
    }

    const promise = fetchData()

    this.cache.set(key, promise)

    return promise
  }
}
