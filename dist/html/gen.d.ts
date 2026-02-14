import { SettingsAreaElement, SettingsCheckboxElement, SettingsInputElement, SettingsSelectElement } from "../types/html.js";
export declare function generateBase(title: string, inline?: boolean): HTMLLabelElement;
export declare function generateInput({ id, title, value, number, inline }: SettingsInputElement): HTMLLabelElement;
export declare function generateSelect({ id, title, options, value, inline }: SettingsSelectElement): HTMLLabelElement;
export declare function generateCheckbox({ id, title, value, inline }: SettingsCheckboxElement): HTMLLabelElement;
export declare function generateArea({ id, title, value, width, height, cols, rows, inline }: SettingsAreaElement): HTMLLabelElement;
