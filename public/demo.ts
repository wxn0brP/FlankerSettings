import "@wxn0brp/flanker-ui/html";
import { Engine } from "../src";
import { createWebStorageValthera } from "@wxn0brp/db-storage-web";
import { generateHTML } from "../src/html";

const storeData = {
    theme: "dark",
    notifications: true,
    username: "Master",
    refreshRate: 42,
    description: "This is a description",
}

const db = createWebStorageValthera("settings");

const app = qs("#app");
generateHTML([
    {
        id: "theme",
        type: "select",
        title: "UI Theme",
        options: [
            { value: "light", label: "light" },
            { value: "dark", label: "dark" }
        ]
    },
    {
        id: "notifications",
        type: "checkbox",
        inline: true,
        title: "Show notifications"
    },
    {
        id: "username",
        type: "input",
        title: "User name"
    },
    {
        id: "refreshRate",
        title: "Refresh rate",
        type: "input",
        number: {
            min: 1,
            max: 100,
            step: 1
        }
    },
    {
        id: "description",
        type: "area",
        title: "Area",
        width: 300
    }
], app);

const engine = new Engine(db, storeData, app);
await engine.init();

globalThis.engine = engine;
globalThis.db = db;
globalThis.dbDump = async () => console.log(await db.find("settings"));