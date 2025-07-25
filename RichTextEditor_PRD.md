# Product Requirements Document: @benova/rich-text-editor

## 1. Overview

### 1.1. Product Vision
To create a self-contained, reusable, and themeable rich-text editor (WYSIWYG) component for React applications. The editor will be built using modern development practices, relying on Material-UI (MUI) v5 for its user interface and avoiding dependencies on third-party editor libraries. Its primary goal is to provide a consistent, reliable, and secure editing experience for developers within the Benova ecosystem.

### 1.2. Target Audience
The primary users of this component are developers building features within Benova's web applications who require a simple yet robust rich-text input field.

## 2. Core Features

### 2.1. WYSIWYG Editing Core
- **`contentEditable` Foundation:** The editor will be built upon a standard `contentEditable` div, ensuring a native and responsive editing experience.
- **Controlled Component:** It will function as a controlled React component, with its state managed through `value` (an HTML string) and `onChange` props, mimicking the behavior of a standard form input.

### 2.2. Toolbar & Formatting Controls
A customizable toolbar built with MUI v5 components will provide users with essential formatting options:
- **Text Formatting:** Bold, Italic, Underline, Strikethrough.
- **Block Styles:** Support for basic heading levels (e.g., H1, H2, H3).
- **Lists:** Ordered (numbered) and Unordered (bulleted) lists.
- **Links:** A simple interface to add, edit, or remove hyperlinks.
- **Clean Formatting:** A button to strip all HTML formatting from the selected text, reverting it to plain text.

### 2.3. Character Counter
- **Optional Limit:** The component will optionally display a character counter when a `maxChars` prop is provided.
- **Visual Feedback:** The counter will change color (e.g., to a warning color) to indicate when the character limit has been exceeded, providing clear feedback to the user.

### 2.4. Customization and Theming
- **MUI v5 `sx` Prop:** All styling will be implemented using the `sx` prop, allowing developers to easily override styles and ensure the component seamlessly integrates with their application's MUI theme.
- **Dimensional Props:** The editor's dimensions can be controlled via `height`, `minHeight`, and `maxHeight` props.

## 3. Technical Specifications

- **Framework:** React `^16.9.0` or higher (as a peer dependency).
- **UI Library:** Material-UI v5 (`@mui/material`) and Emotion (as peer dependencies).
- **Core Technology:** The editor's rich-text capabilities will be powered by the browser's native `document.execCommand()` API.
- **Package Dependencies:**
  - **Peer Dependencies:** `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`.
  - **Internal Dependencies:** The package will be self-contained and have no direct external dependencies.
- **Browser Support:** The component will be tested and supported on the latest versions of modern browsers, including Chrome, Firefox, Safari, and Edge.

## 4. Component API (Props)

| Prop        | Type                                                              | Default     | Description                                                                 |
|-------------|-------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------|
| `name`      | `string`                                                          | `''`        | The name for the input, passed in the `onChange` event object.              |
| `value`     | `string`                                                          | `''`        | The HTML content to be displayed and edited.                                |
| `onChange`  | `(event: { target: { name: string, value: string } }) => void`    | `() => {}`  | Callback function fired when the editor's content changes.                  |
| `placeholder`| `string`                                                          | `''`        | Placeholder text to display when the editor is empty.                       |
| `maxChars`  | `number`                                                          | `null`      | The maximum number of characters allowed. Enables the character counter.    |
| `height`    | `string \| number`                                                | `'auto'`    | The fixed height of the editor container.                                   |
| `minHeight` | `string \| number`                                                | `'150px'`   | The minimum height of the editor container.                                 |
| `maxHeight` | `string \| number`                                                | `null`      | The maximum height of the editor container.                                 |
| `sx`        | `object`                                                          | `{}`        | MUI `sx` prop for applying custom styles to the root component.             |

## 5. Utility Functions (To be included in the package)

The following helper functions will be included to make the package self-sufficient:
- **`uuid_v4(): string`**: Generates a version 4 UUID for internal use.
- **`countContentRealLength(html: string): number`**: Accurately counts the visible characters within the HTML content, ignoring tags.
- **`sanitizeHtml(html: string): string`**: **(Proposed)** A utility to clean the output HTML, removing potentially unsafe tags and attributes to prevent XSS vulnerabilities.
- **`isEditorEmpty(html: string): boolean`**: **(Proposed)** A robust check to determine if the editor content is functionally empty (e.g., contains only empty tags like `<p><br></p>`).
- **`htmlToPlainText(html: string): string`**: **(Proposed)** A utility to convert the rich HTML content into a clean, readable plain text string.

## 6. Out of Scope for Version 1.0

To ensure a focused and timely initial release, the following features will not be included in the first version:
- Image, video, or general file uploads.
- Table creation and editing.
- Complex embeds (e.g., social media posts, iframes).
- Real-time collaboration or multi-user editing features.
