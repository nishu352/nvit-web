/**
 * Client-Side In-Memory Cache for Company Search and Autocomplete
 * 
 * Provides instantaneous 0ms responses for repeated queries and suggestions.
 * Bounded with LRU eviction and 3-minute TTL to ensure fresh data.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class BoundedMemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxEntries: number;
  private ttlMs: number;

  constructor(maxEntries = 100, ttlMs = 3 * 60 * 1000) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
  }

  get(key: string): T | null {
    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey) return null;

    const entry = this.cache.get(normalizedKey);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(normalizedKey);
      return null;
    }

    // Refresh key order for LRU behavior
    this.cache.delete(normalizedKey);
    this.cache.set(normalizedKey, entry);
    return entry.data;
  }

  set(key: string, data: T): void {
    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey) return;

    if (this.cache.has(normalizedKey)) {
      this.cache.delete(normalizedKey);
    } else if (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(normalizedKey, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const companySearchClientCache = new BoundedMemoryCache<any[]>(100, 3 * 60 * 1000);
export const companyAutocompleteClientCache = new BoundedMemoryCache<any[]>(150, 3 * 60 * 1000);
