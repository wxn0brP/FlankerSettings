import { generateInput, generateSelect, generateCheckbox, generateArea } from "./gen.js";
export function generateElement(element) {
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
            const n = element;
            throw new Error(`Unknown element type: ${n}`);
    }
}
export function generateHTML(elements, container) {
    elements.forEach(el => container.appendChild(generateElement(el)));
}
