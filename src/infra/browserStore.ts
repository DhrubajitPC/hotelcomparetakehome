class BrowserStore {
  store: Storage = localStorage;

  public setItem(key: string, value: any): void {
    this.store.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const data: string | null = this.store.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  }

  public removeItem(key: string) {
    this.store.removeItem(key);
  }

  public clear() {
    this.store.clear();
  }
}

export const browserStore = new BrowserStore();
