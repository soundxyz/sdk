export class CacheUtils {
  private static cache = new Map<string, unknown>()

  public static async getOrSetCache<T>(key: string, fetchData: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T
    }
    const data = await fetchData()
    this.cache.set(key, data)

    return data
  }
}
