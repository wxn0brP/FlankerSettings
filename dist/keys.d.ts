import { DbSetting } from "./types/index.js";
export declare function objToKeys(obj: Record<string, any>, prefix?: string): DbSetting[];
export declare function keysToObj(settings: DbSetting[]): Record<string, any>;
