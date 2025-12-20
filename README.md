# Flanker Settings

A library for creating settings pages with a reactive store and database persistence.

## Installation

```bash
npm install @wxn0brp/flanker-settings @wxn0brp/flanker-ui @wxn0brp/db-core
```

## JavaScript API

The JavaScript API allows you to initialize the settings engine and generate the HTML for the settings page.

**Example:**

```typescript
import "@wxn0brp/flanker-ui/html";
import { Engine, generateHTML } from "@wxn0brp/flanker-settings";
import { SettingsElement } from "@wxn0brp/flanker-settings/types";
import { createMemoryValthera } from "@wxn0brp/db-core";

const db = createMemoryValthera();
const root = qs("settings-container");

const elements: SettingsElement[] = [
    {
        type: "select",
        id: "theme",
        label: "Theme",
        options: [
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
        ],
    },
    {
        type: "checkbox",
        id: "notifications",
        label: "Enable notifications",
    },
];

generateHTML(elements, root);

const engine = new Engine(
    db,
    {
        theme: "dark",
        notifications: true,
    },
    root
);

engine.init();
```

## CSS API

The library uses CSS variables for styling. You can override these variables to customize the look and feel of the settings page.

| Variable                               | Description                                    |
| -------------------------------------- | ---------------------------------------------- |
| `--settings-background-color`          | Background color of the settings container.    |
| `--settings-border-color`              | Border color of the settings container.        |
| `--settings-text-color`                | Main text color.                               |
| `--settings-input-background`          | Background color of input fields.              |
| `--settings-input-text-color`          | Text color of input fields.                    |
| `--settings-input-border-color`        | Border color of input fields.                  |
| `--settings-input-focus-border-color`  | Border color of input fields when focused.     |
| `--settings-input-focus-background`    | Background color of input fields when focused. |
| `--settings-accent-color`              | Accent color for checkboxes and radios.        |
| `--settings-link-color`                | Color of links.                                |
| `--settings-link-hover-color`          | Color of links when hovered.                   |