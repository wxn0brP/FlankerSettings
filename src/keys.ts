import { DbSetting } from "./types";

export function objToKeys(obj: Record<string, any>, prefix: string = ""): DbSetting[] {
    const result: DbSetting[] = [];

    for (const [k, v] of Object.entries(obj)) {
        const key = prefix ? `${prefix}.${k}` : k;

        if (v !== null && typeof v === "object" && !Array.isArray(v)) {
            result.push(...objToKeys(v, key));
        } else {
            result.push({ _id: key, v });
        }
    }

    return result;
}

export function keysToObj(settings: DbSetting[]): Record<string, any> {
    const result: Record<string, any> = {};

    for (const { _id, v } of settings) {
        const keys = _id.split(".");
        let current = result;

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!(k in current) || typeof current[k] !== "object" || Array.isArray(current[k])) {
                current[k] = {};
            }
            current = current[k];
        }

        const lastKey = keys[keys.length - 1];
        current[lastKey] = v;
    }

    return result;
}