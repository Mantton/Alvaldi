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

  async connect() {
    if (this.client.isOpen) return;
    await this.client.connect();
    return;
  }

  disconnect() {
    return this.client.disconnect();
  }

  async flush() {
    return this.client.flushAll();
  }

  async get(key: string) {
    await this.connect();
    return this.client.get(key);
  }

  async set(key: string, value: string, seconds?: number) {
    if (!seconds) return this.client.set(key, value);
    await this.connect();
    return this.client.setEx(key, seconds, value);
  }

  async getGrouped(group: string, key: string) {
    const p = `${group}::${key}`;
    await this.connect();
    return this.get(p);
  }

  async setGrouped(
    group: string,
    key: string,
    value: string,
    seconds?: number
  ) {
    const p = `${group}::${key}`;
    await this.connect();
    return this.set(p, value, seconds);
  }

  async delete(key: string) {
    await this.connect();
    return this.client.del(key);
  }

  async deleteGrouped(group: string, key: string) {
    const p = `${group}::${key}`;
    await this.connect();
    return this.delete(p);
  }
}

const cache = new Cache();

export default cache;
