import { deepMerge } from "@wxn0brp/db-core/utils/merge";
import { createStore } from "@wxn0brp/flanker-ui";
import { watchCheckbox, watchInput, watchSelect } from "@wxn0brp/flanker-ui/component/helpers";
import { keysToObj } from "./keys.js";
export class Engine {
    db;
    storeData;
    root;
    opts;
    store;
    constructor(db, storeData, root, opts = {}) {
        this.db = db;
        this.storeData = storeData;
        this.root = root;
        this.opts = {
            collection: "settings",
            ...opts
        };
    }
    async init() {
        await this._initStoreAndDb();
        await this._initWatch();
    }
    async _initStoreAndDb() {
        const settings = await this.db.find(this.opts.collection);
        const obj = keysToObj(settings);
        const storeData = deepMerge({}, this.storeData, obj);
        this.store = createStore(storeData);
    }
    _pickCell(keys) {
        let current = this.store;
        for (const key of keys) {
            current = current[key];
        }
        return current;
    }
    async _initWatch() {
        this.root.querySelectorAll("[data-id]").forEach(el => {
            const id = el.getAttribute("data-id");
            if (!id)
                return;
            const cell = this._pickCell(id.split("."));
            cell.subscribe(v => {
                this.db.updateOneOrAdd(this.opts.collection, { _id: id }, { v });
            });
            const target = el;
            if (target.type === "checkbox") {
                target.checked = cell.get();
                watchCheckbox(target, cell);
            }
            else if (target instanceof HTMLSelectElement) {
                target.value = cell.get();
                watchSelect(target, cell);
            }
            else {
                target.value = cell.get();
                watchInput(target, cell);
            }
        });
    }
}
