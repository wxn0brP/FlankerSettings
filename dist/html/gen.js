export function generateBase(title, inline = false) {
    const label = document.createElement("label");
    label.innerHTML = title;
    if (inline)
        label.classList.add("inline");
    return label;
}
export function generateInput({ id, title, value, number, inline }) {
    const label = generateBase(title, inline);
    const input = document.createElement("input");
    if (number) {
        input.setAttribute("type", "number");
        if (typeof number.min !== "undefined")
            input.setAttribute("min", number.min.toString());
        if (typeof number.max !== "undefined")
            input.setAttribute("max", number.max.toString());
        if (typeof number.step !== "undefined")
            input.setAttribute("step", number.step.toString());
    }
    else
        input.setAttribute("type", "text");
    input.setAttribute("data-id", id);
    value = typeof value === "number" ? value.toString() : value;
    input.value = value || "";
    label.appendChild(input);
    return label;
}
export function generateSelect({ id, title, options, value, inline }) {
    const label = generateBase(title, inline);
    const select = document.createElement("select");
    select.setAttribute("data-id", id);
    for (const option of options) {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", option.value);
        optionElement.innerHTML = option.label || option.value;
        select.appendChild(optionElement);
    }
    select.value = value || "";
    label.appendChild(select);
    return label;
}
export function generateCheckbox({ id, title, value, inline }) {
    const label = generateBase(title, inline);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-id", id);
    checkbox.checked = value || false;
    label.insertBefore(checkbox, label.firstChild);
    return label;
}
export function generateArea({ id, title, value, width, height, cols, rows, inline }) {
    const label = generateBase(title, inline);
    const textarea = document.createElement("textarea");
    textarea.setAttribute("data-id", id);
    textarea.value = value || "";
    if (width || cols)
        textarea.style.maxWidth = "100%";
    if (height || rows)
        textarea.style.maxHeight = "100%";
    if (width)
        textarea.style.width = typeof width === "number" ? `${width}px` : width;
    if (height)
        textarea.style.height = typeof height === "number" ? `${height}px` : height;
    if (cols)
        textarea.cols = cols;
    if (rows)
        textarea.rows = rows;
    label.appendChild(textarea);
    return label;
}
