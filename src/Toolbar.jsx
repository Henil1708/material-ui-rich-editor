import React from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FormatIndentIncreaseRoundedIcon from "@mui/icons-material/FormatIndentIncreaseRounded";
import FormatIndentDecreaseRoundedIcon from "@mui/icons-material/FormatIndentDecreaseRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import {
  FormatBoldRounded,
  FormatItalicRounded,
  FormatUnderlined,
  StrikethroughS,
  Link as LinkIcon,
  FormatClear,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

/**
 * Toolbar component for the rich text editor
 * Provides formatting controls including text formatting, headings, lists, and indentation
 */
export const Toolbar = ({
  onFormat,
  showStrikethrough = false,
  showCleanFormat = false,
  currentBlockFormat = "p",
  currentInlineFormats = {},
}) => {
  // Define toolbar buttons configuration
  const toolbarButtons = [
    {
      command: "bold",
      icon: FormatBoldRounded,
      title: "Bold (Ctrl+B)",
      group: "text",
    },
    {
      command: "italic",
      icon: FormatItalicRounded,
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

  // Define heading format options
  const formatButtons = [
    {
      command: "formatBlock",
      value: "h1",
      label: "Heading 1",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "h2",
      label: "Heading 2",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "h3",
      label: "Heading 3",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "h4",
      label: "Heading 4",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "h5",
      label: "Heading 5",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "h6",
      label: "Heading 6",
      group: "heading",
    },
    {
      command: "formatBlock",
      value: "p",
      label: "Paragraph",
      group: "heading",
    },
  ];

  // Define list formatting options
  const listButtons = [
    {
      command: "insertUnorderedList",
      label: "• List",
      group: "list",
      icon: FormatListBulletedRoundedIcon,
    },
    {
      command: "insertOrderedList",
      label: "1. List",
      group: "list",
      icon: FormatListNumberedRoundedIcon,
    },
  ];

  // Define indentation controls
  const indentButtons = [
    {
      command: "outdent",
      label: "Outdent",
      group: "indent",
      icon: FormatIndentDecreaseRoundedIcon,
    },
    {
      command: "indent",
      label: "Indent",
      group: "indent",
      icon: FormatIndentIncreaseRoundedIcon,
    },
  ];

  /**
   * Handle button click events
   * @param {string} command - The formatting command to execute
   * @param {string} value - Optional value for the command
   */
  const handleButtonClick = (command, value) => {
    onFormat(command, value);
  };

  /**
   * Handle menu item selection for heading dropdown
   * @param {string} command - The formatting command
   * @param {string} value - The selected value
   */
  const handleMenuItemClick = (command, value) => {
    onFormat(command, value);
  };

  return (
    <Box
      sx={{
        p: "0.5rem 1rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {/* Heading dropdown */}
      <FormControl size="small" sx={{ minWidth: 116 }}>
        <Select
          labelId="heading-select-label"
          id="heading-select"
          value={currentBlockFormat}
          placeholder="Heading"
          variant="standard"
          disableUnderline
          sx={{
            minWidth: "max-content",
            backgroundColor: "transparent",
            color: "#666",
            "& .MuiSelect-icon": {
              color: "#666",
            },
          }}
          onChange={(event) =>
            handleMenuItemClick("formatBlock", event.target.value)
          }
          IconComponent={KeyboardArrowDownRoundedIcon}
        >
          {formatButtons.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Text formatting buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {toolbarButtons.map(({ command, icon: Icon, title }) => {
          const active = currentInlineFormats?.[command] || false;
          return (
            <Tooltip key={command} title={title}>
              <IconButton
                onClick={() => handleButtonClick(command)}
                size="small"
                sx={{
                  color: active ? "primary.main" : "#666",
                  bgcolor: active ? "action.selected" : undefined,
                  "&:hover": { bgcolor: "#e0e0e0" },
                  "&:active": { bgcolor: "#d5d5d5" },
                }}
              >
                <Icon fontSize="medium" />
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* List and quote buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {listButtons.map(({ command, value, label, icon: Icon }) => {
          let active = false;
          if (command === "formatBlock" && value === "blockquote") {
            active = currentBlockFormat === "blockquote";
          } else if (command === "insertUnorderedList") {
            active = currentInlineFormats.unorderedList;
          } else if (command === "insertOrderedList") {
            active = currentInlineFormats.orderedList;
          }

          return (
            <Tooltip key={command} title={label}>
              <IconButton
                onClick={() => handleButtonClick(command)}
                size="small"
                sx={{
                  color: active ? "primary.main" : "#666",
                  bgcolor: active ? "action.selected" : undefined,
                  "&:hover": { bgcolor: "#e0e0e0" },
                  "&:active": { bgcolor: "#d5d5d5" },
                }}
              >
                <Icon fontSize="medium" />
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

      {/* Indentation controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {indentButtons.map(({ command, label, icon: Icon }) => {
          const active = currentInlineFormats?.[command] || false;
          return (
            <Tooltip key={command} title={label}>
              <IconButton
                onClick={() => handleButtonClick(command)}
                size="small"
                sx={{
                  color: active ? "primary.main" : "#666",
                  bgcolor: active ? "action.selected" : undefined,
                  "&:hover": { bgcolor: "#e0e0e0" },
                  "&:active": { bgcolor: "#d5d5d5" },
                }}
              >
                <Icon fontSize="medium" />
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

// PropTypes for type checking
Toolbar.propTypes = {
  /** Callback function for formatting commands */
  onFormat: PropTypes.func.isRequired,
  /** Whether to show strikethrough button */
  showStrikethrough: PropTypes.bool,
  /** Whether to show clean format button */
  showCleanFormat: PropTypes.bool,
  /** Current block format (h1, h2, h3, h4, h5, h6, p) */
  currentBlockFormat: PropTypes.string,
  /** Object containing current inline format states */
  currentInlineFormats: PropTypes.shape({
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    strikeThrough: PropTypes.bool,
    link: PropTypes.bool,
    unorderedList: PropTypes.bool,
    orderedList: PropTypes.bool,
  }),
};

// Default props
Toolbar.defaultProps = {
  showStrikethrough: false,
  showCleanFormat: false,
  currentBlockFormat: "p",
  currentInlineFormats: {},
};
