import React from "react";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Link as LinkIcon,
  FormatClear,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Tooltip } from "@material-ui/core";

export const Toolbar = ({
  onFormat,
  showStrikethrough = false,
  showCleanFormat = false,
}) => {
  const toolbarButtons = [
    {
      command: "bold",
      icon: FormatBold,
      title: "Bold (Ctrl+B)",
      group: "text",
    },
    {
      command: "italic",
      icon: FormatItalic,
      title: "Italic (Ctrl+I)",
      group: "text",
    },
    {
      command: "underline",
      icon: FormatUnderlined,
      title: "Underline (Ctrl+U)",
      group: "text",
    },
    showStrikethrough && {
      command: "strikeThrough",
      icon: StrikethroughS,
      title: "Strikethrough (Ctrl+S)",
      group: "text",
    },
    {
      command: "createLink",
      icon: LinkIcon,
      title: "Insert Link (Ctrl+K)",
      group: "link",
    },
    showCleanFormat && {
      command: "removeFormat",
      icon: FormatClear,
      title: "Remove Formatting (Ctrl+E)",
      group: "clean",
    },
  ].filter(Boolean);

  const formatButtons = [
    { command: "formatBlock", value: "h1", label: "H1", group: "heading" },
    { command: "formatBlock", value: "h2", label: "H2", group: "heading" },
    { command: "formatBlock", value: "h3", label: "H3", group: "heading" },
    { command: "formatBlock", value: "p", label: "P", group: "heading" },
  ];

  const listButtons = [
    { command: "insertUnorderedList", label: "• List", group: "list" },
    { command: "insertOrderedList", label: "1. List", group: "list" },
    {
      command: "formatBlock",
      value: "blockquote",
      label: "Quote",
      group: "list",
    },
  ];

  const handleButtonClick = (command, value) => {
    onFormat(command, value);
  };

  return (
    <Box
      sx={{
        p: "4px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {/* Heading buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {formatButtons.map(({ command, value, label }) => (
          <Button
            key={`${command}-${value}`}
            onClick={() => handleButtonClick(command, value)}
            size="small"
            variant="text"
            sx={{
              minWidth: "auto",
              px: 1,
              py: 0.5,
              fontSize:
                value === "h1"
                  ? "1.1rem"
                  : value === "h2"
                  ? "1rem"
                  : "0.875rem",
              fontWeight: value?.startsWith("h") ? "bold" : "normal",
              color: "#666",
              "&:hover": { bgcolor: "#e0e0e0" },
              "&:active": { bgcolor: "#d5d5d5" },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Text formatting buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {toolbarButtons.map(({ command, icon: Icon, title }) => (
          <Tooltip key={command} title={title}>
            <IconButton
              onClick={() => handleButtonClick(command)}
              size="small"
              sx={{
                "&:hover": { bgcolor: "#e0e0e0" },
                "&:active": { bgcolor: "#d5d5d5" },
              }}
            >
              <Icon fontSize="medium" />
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      {/* List and quote buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {listButtons.map(({ command, value, label }) => (
          <Button
            key={`${command}-${value || "default"}`}
            onClick={() => handleButtonClick(command, value)}
            size="small"
            variant="text"
            sx={{
              px: 1,
              py: 0.5,
              fontSize: "0.875rem",
              color: "#666",
              "&:hover": { bgcolor: "#e0e0e0" },
              "&:active": { bgcolor: "#d5d5d5" },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
