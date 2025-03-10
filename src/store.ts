import {Changes} from "./domain";

const LAST_MODIFIED = "last-modified";
const CHANGES = "changes";

export async function getStoredLastModified(): Promise<string | null> {
  const modified = await get<string>(LAST_MODIFIED);
  return modified === "" ? null : modified;
}

export async function setStoredLastModified(modified?: string | null): Promise<void> {
  if (modified === null) {
    modified = "";
  }

  return modified ? put(LAST_MODIFIED, modified) : remove(LAST_MODIFIED);
}

export async function getStoredChanges(): Promise<Changes | null> {
  return get(CHANGES);
}

export async function setStoredChanges(changes?: Changes): Promise<void> {
  return changes ? put(CHANGES, changes) : remove(CHANGES);
}

async function get<T>(key: string): Promise<T | null> {
  return BSZET_VPLAN.get(key, {type: "json"});
}

async function put<T>(key: string, value: T): Promise<void> {
  return BSZET_VPLAN.put(key, JSON.stringify(value));
}

async function remove(key: string): Promise<void> {
  return BSZET_VPLAN.delete(key);
}
