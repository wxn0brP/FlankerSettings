export interface SettingsBaseElement {
    id: string;
    title: string;
    inline?: boolean;
}
export interface SettingsInputElement extends SettingsBaseElement {
    type: "input";
    number?: {
        min?: number;
        max?: number;
        step?: number;
    };
    width?: number;
    value?: string | number;
}
export interface SettingsSelectElement extends SettingsBaseElement {
    type: "select";
    options: {
        value: string;
        label?: string;
    }[];
    value?: string;
}
export interface SettingsCheckboxElement extends SettingsBaseElement {
    type: "checkbox";
    value?: boolean;
}
export interface SettingsAreaElement extends SettingsBaseElement {
    type: "area";
    value?: string;
    width?: number | string;
    height?: number | string;
    cols?: number;
    rows?: number;
}
export type SettingsElement = SettingsInputElement | SettingsSelectElement | SettingsCheckboxElement | SettingsAreaElement;
