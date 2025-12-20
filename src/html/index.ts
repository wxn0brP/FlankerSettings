import { SettingsElement } from "../types/html";
import { generateInput, generateSelect, generateCheckbox, generateArea } from "./gen";

export function generateElement(element: SettingsElement): HTMLLabelElement {
    switch (element.type) {
        case "input":
            return generateInput(element);
        case "select":
            return generateSelect(element);
        case "checkbox":
            return generateCheckbox(element);
        case "area":
            return generateArea(element);
        default:
            const n: never = element;
            throw new Error(`Unknown element type: ${n}`);
    }
}

export function generateHTML(elements: SettingsElement[], container: HTMLDivElement) {
    elements.forEach(el => container.appendChild(generateElement(el)));
}