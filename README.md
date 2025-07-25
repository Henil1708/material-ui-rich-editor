# React Material Rich Editor

A rich text editor component built with React and Material-UI v4, compatible with older React versions (16.8+).

## Features

- 🎨 Material-UI v4 theming support
- ⌨️ Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
- 🔗 Link insertion and editing with tooltip
- 📝 Text formatting (Bold, Italic, Underline)
- 📋 Heading support (H1, H2, H3, Paragraph)
- 📃 Lists (Ordered and Unordered)
- 💬 Blockquotes
- 🎯 Lightweight and performant
- ♿ Accessible with proper ARIA support

## Installation

```bash
npm install react-material-rich-editor
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react@^16.8.0 react-dom@^16.8.0 @material-ui/core@^4.0.0 @material-ui/icons@^4.0.0
```

## Usage

### Basic Usage

```jsx
import React, { useState } from "react";
import RichTextEditor from "react-material-rich-editor";

function App() {
  const [content, setContent] = useState("");

  return (
    <div>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
    </div>
  );
}
```

### With Custom Styling

```jsx
import React, { useState } from "react";
import RichTextEditor from "react-material-rich-editor";

function App() {
  const [content, setContent] = useState("");

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Enter your content here..."
      minHeight="300px"
      style={{
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  );
}
```

### Advanced Usage with Controlled State

```jsx
import React, { useState, useCallback } from "react";
import { Button, Box } from "@material-ui/core";
import RichTextEditor from "react-material-rich-editor";

function AdvancedEditor() {
  const [content, setContent] = useState("<p>Initial content</p>");

  const handleSave = useCallback(() => {
    console.log("Saving content:", content);
    // Send to API or save to state management
  }, [content]);

  const handleReset = useCallback(() => {
    setContent("");
  }, []);

  return (
    <Box>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Write something amazing..."
        minHeight="400px"
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
```

## Props

| Prop          | Type       | Default             | Description                                |
| ------------- | ---------- | ------------------- | ------------------------------------------ |
| `value`       | `string`   | `""`                | The HTML content of the editor             |
| `onChange`    | `function` | `undefined`         | Callback fired when content changes        |
| `placeholder` | `string`   | `"Start typing..."` | Placeholder text when editor is empty      |
| `minHeight`   | `string`   | `"200px"`           | Minimum height of the editor               |
| `style`       | `object`   | `undefined`         | Additional styles for the editor container |

## Keyboard Shortcuts

| Shortcut           | Action             |
| ------------------ | ------------------ |
| `Ctrl+B` / `Cmd+B` | Toggle Bold        |
| `Ctrl+I` / `Cmd+I` | Toggle Italic      |
| `Ctrl+U` / `Cmd+U` | Toggle Underline   |
| `Ctrl+K` / `Cmd+K` | Insert/Edit Link   |
| `Escape`           | Close Link Tooltip |

## Styling with Material-UI Theme

The editor respects your Material-UI theme:

```jsx
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import RichTextEditor from "react-material-rich-editor";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function ThemedEditor() {
  return (
    <ThemeProvider theme={theme}>
      <RichTextEditor />
    </ThemeProvider>
  );
}
```

## Utility Functions

The package also exports utility functions for advanced use cases:

```jsx
import {
  applyFormatting,
  getSelectionInfo,
  insertLink,
  isFormatActive,
  cleanHTML,
} from "react-material-rich-editor";

// Apply formatting programmatically
applyFormatting("bold");

// Get current selection info
const selection = getSelectionInfo();

// Insert a link
insertLink("https://example.com");

// Check if formatting is active
const isBold = isFormatActive("bold");

// Clean HTML content
const cleaned = cleanHTML(htmlContent);
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Changelog

### 1.0.0

- Initial release
- Material-UI v4 compatibility
- Basic rich text editing features
- Link insertion and management
- Keyboard shortcuts
- Responsive design
