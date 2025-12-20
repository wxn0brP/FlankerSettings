import { ValtheraCompatible } from "@wxn0brp/db-core";
import { deepMerge } from "@wxn0brp/db-core/utils/merge";
import { createStore, ReactiveCell, StoreType } from "@wxn0brp/flanker-ui";
import { watchCheckbox, watchInput, watchSelect } from "@wxn0brp/flanker-ui/component/helpers";
import { keysToObj } from "./keys";
import { DbSetting } from "./types";

export interface Opts {
    collection?: string;
}

export class Engine<T = any> {
    private opts: Opts;
    public store: StoreType<T>;

    constructor(
        private db: ValtheraCompatible,
        private storeData: T,
        private root: HTMLDivElement,
        opts: Opts = {}
    ) {
        this.opts = {
            collection: "settings",
            ...opts
        }
    }

    async init() {
        await this._initStoreAndDb();
        await this._initWatch();
    }

    async _initStoreAndDb() {
        const settings = await this.db.find<DbSetting>(this.opts.collection);
        const obj = keysToObj(settings);

        const storeData = deepMerge({}, this.storeData, obj);
        this.store = createStore(storeData) as StoreType<T>;
    }

    private _pickCell<T = any>(keys: string[]): ReactiveCell<T> {
        let current = this.store;
        for (const key of keys) {
            current = current[key];
        }
        return current as any;
    }

    private async _initWatch() {
        this.root.querySelectorAll("[data-id]").forEach(el => {
            const id = el.getAttribute("data-id");
            if (!id) return;
            const cell = this._pickCell(id.split("."));

            cell.subscribe(v => {
                this.db.updateOneOrAdd(this.opts.collection, { _id: id }, { v });
            });

            const target = el as HTMLInputElement | HTMLSelectElement;

            if (target.type === "checkbox") {
                target.checked = cell.get();
                watchCheckbox(target, cell);
            } else if (target instanceof HTMLSelectElement) {
                target.value = cell.get();
                watchSelect(target, cell);
            } else {
                target.value = cell.get();
                watchInput(target, cell);
            }
        });
    }
}