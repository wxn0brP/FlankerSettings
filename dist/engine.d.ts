import { ValtheraCompatible } from "@wxn0brp/db-core";
import { StoreType } from "@wxn0brp/flanker-ui";
export interface Opts {
    collection?: string;
}
export declare class Engine<T = any> {
    private db;
    private storeData;
    private root;
    private opts;
    store: StoreType<T>;
    constructor(db: ValtheraCompatible, storeData: T, root: HTMLDivElement, opts?: Opts);
    init(): Promise<void>;
    _initStoreAndDb(): Promise<void>;
    private _pickCell;
    private _initWatch;
}
