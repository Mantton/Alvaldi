import { REDIS_URL } from "@/config/env";
import { createClient } from "redis";

class Cache {
  private client = createClient({
    url: REDIS_URL,
  });

  constructor() {
    this.client.on("error", (err) => console.error(err));
    this.client.on("connect", () => {
      console.info("[REDIS] Connected");
    });
  }

  connect() {
    return this.client.connect();
  }

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string, seconds?: number) {
    if (!seconds) return this.client.set(key, value);
    return this.client.setEx(key, seconds, value);
  }

  getGrouped(group: string, key: string) {
    const p = `${group}::${key}`;
    return this.get(p);
  }

  setGrouped(group: string, key: string, value: string, seconds?: number) {
    const p = `${group}::${key}`;
    return this.set(p, value, seconds);
  }

  delete(key: string) {
    return this.client.del(key);
  }

  deleteGrouped(group: string, key: string) {
    const p = `${group}::${key}`;
    return this.delete(p);
  }
}

const cache = new Cache();

export default cache;
