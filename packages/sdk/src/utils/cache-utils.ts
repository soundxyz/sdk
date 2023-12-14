export class CacheUtils {
  private static cache = new Map<string, unknown>()

  public static async getOrSetCache<T>(key: string, fetchData: () => Promise<T>): Promise<T> {
    let data = this.cache.get(key)
    if (!data) {
      data = await fetchData()
      this.cache.set(key, data)
    }
    return data as T
  }
}
