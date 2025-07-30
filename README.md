# Material-UI Rich Text Editor

A comprehensive rich text editor built with Material-UI components, featuring a full-featured toolbar, link management, and keyboard shortcuts.

## Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough
- **Block Formatting**: Headings (H1-H6), paragraphs, lists
- **Link Management**: Insert, edit, and remove links with a modal interface
- **Keyboard Shortcuts**: Full keyboard support for common formatting operations
- **Character Counter**: Optional character limit with visual feedback
- **Responsive Design**: Clean, modern UI that adapts to different screen sizes
- **TypeScript Support**: Full PropTypes for type checking and development

## Installation

### Using npm

```bash
npm install material-ui-rich-editor
```

### Using yarn

```bash
yarn add material-ui-rich-editor
```

## Usage

```jsx
import React, { useState } from "react";
import { RichTextEditor } from "material-ui-rich-editor";

function App() {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <RichTextEditor
      value={content}
      onChange={handleChange}
      placeholder="Start typing your content..."
      maxChars={1000}
    />
  );
}
```

## Components

### RichTextEditor

The main editor component with full rich text capabilities.

#### Props

| Prop          | Type             | Default             | Description                      |
| ------------- | ---------------- | ------------------- | -------------------------------- |
| `name`        | `string`         | `""`                | Name attribute for the editor    |
| `value`       | `string`         | `""`                | Current value of the editor      |
| `onChange`    | `function`       | `() => {}`          | Callback when content changes    |
| `onBlur`      | `function`       | `undefined`         | Callback when editor loses focus |
| `placeholder` | `string`         | `"Start typing..."` | Placeholder text                 |
| `maxChars`    | `number`         | `null`              | Maximum characters allowed       |
| `height`      | `string\|number` | `"auto"`            | Editor height                    |
| `minHeight`   | `string\|number` | `"150px"`           | Minimum height                   |
| `maxHeight`   | `string\|number` | `null`              | Maximum height                   |
| `sx`          | `object`         | `{}`                | Additional styles                |
| `style`       | `object`         | `undefined`         | Inline styles                    |
| `theme`       | `object`         | `undefined`         | Theme object                     |

### Toolbar

The formatting toolbar component.

#### Props

| Prop                   | Type       | Default      | Description                  |
| ---------------------- | ---------- | ------------ | ---------------------------- |
| `onFormat`             | `function` | **required** | Format command callback      |
| `showStrikethrough`    | `boolean`  | `false`      | Show strikethrough button    |
| `showCleanFormat`      | `boolean`  | `false`      | Show clean format button     |
| `currentBlockFormat`   | `string`   | `"p"`        | Current block format         |
| `currentInlineFormats` | `object`   | `{}`         | Current inline format states |

### LinkTooltip

Modal component for link management.

#### Props

| Prop           | Type       | Default      | Description              |
| -------------- | ---------- | ------------ | ------------------------ |
| `position`     | `object`   | **required** | Position coordinates     |
| `onSubmit`     | `function` | **required** | Link submission callback |
| `onClose`      | `function` | **required** | Close callback           |
| `initialValue` | `string`   | `""`         | Initial URL value        |
| `isEdit`       | `boolean`  | `false`      | Edit mode flag           |
| `tooltipRef`   | `ref`      | `null`       | Tooltip container ref    |
| `storedRange`  | `object`   | `null`       | Stored selection range   |

## Keyboard Shortcuts

| Shortcut       | Action             |
| -------------- | ------------------ |
| `Ctrl/Cmd + B` | Bold               |
| `Ctrl/Cmd + I` | Italic             |
| `Ctrl/Cmd + U` | Underline          |
| `Ctrl/Cmd + S` | Strikethrough      |
| `Ctrl/Cmd + K` | Insert Link        |
| `Ctrl/Cmd + E` | Remove Formatting  |
| `Ctrl/Cmd + Z` | Undo               |
| `Ctrl/Cmd + Y` | Redo               |
| `Ctrl/Cmd + [` | Outdent            |
| `Ctrl/Cmd + ]` | Indent             |
| `Escape`       | Close link tooltip |

## Utilities

The package exports utility functions for advanced usage:

```jsx
import {
  applyFormatting,
  insertLink,
  getCurrentBlockFormat,
  countContentRealLength,
} from "material-ui-rich-editor";
```

## Development

### Prerequisites

Make sure you have Node.js installed (version 14 or higher).

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/material-ui-rich-editor.git
cd material-ui-rich-editor

# Install dependencies
npm install
# or
yarn install
```

### Development Commands

```bash
# Start development server with hot reload
npm start
# or
yarn start

# Build for production
npm run build
# or
yarn build

# Run tests (if available)
npm test
# or
yarn test
```

### Package Manager Support

This project supports both npm and yarn:

- **npm**: Uses `package-lock.json` for dependency locking
- **yarn**: Uses `yarn.lock` for dependency locking

Choose your preferred package manager and stick with it throughout the project to avoid conflicts.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
