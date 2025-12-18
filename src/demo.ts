import "@wxn0brp/flanker-ui/html";
import { Engine } from ".";
import { createWebStorageValthera } from "@wxn0brp/db-storage-web";

const storeData = {
    theme: "dark",
    notifications: true,
    username: "Master",
    refreshRate: 42
}

const db = createWebStorageValthera("settings");

const engine = new Engine(db, storeData, qs("#app"));
await engine.init();

globalThis.engine = engine;
globalThis.db = db;
globalThis.dbDump = async () => console.log(await db.find("settings"));