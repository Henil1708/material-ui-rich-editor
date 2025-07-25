import React, { useCallback, useRef, useState, useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  applyFormatting,
  insertLink,
  cleanHTML,
  getPlainText,
} from "./utils/editorsUtils";
import { LinkTooltip } from "./LinkTooltip";
import { Toolbar } from "./Toolbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid #e0e0e0",
    borderRadius: theme.spacing(1),
    overflow: "hidden",
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
    },
  },
  editor: {
    padding: theme.spacing(2),
    outline: "none",
    "& p": {
      margin: `${theme.spacing(1)}px 0`,
      "&:first-child": { marginTop: 0 },
      "&:last-child": { marginBottom: 0 },
    },
    "& h1": {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: `${theme.spacing(1.5)}px 0`,
    },
    "& h2": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: `${theme.spacing(1)}px 0`,
    },
    "& h3": {
      fontSize: "1.25rem",
      fontWeight: "bold",
      margin: `${theme.spacing(1)}px 0`,
    },
    "& ul": {
      listStyle: "disc",
      paddingLeft: theme.spacing(3),
      margin: `${theme.spacing(1)}px 0`,
    },
    "& ol": {
      listStyle: "decimal",
      paddingLeft: theme.spacing(3),
      margin: `${theme.spacing(1)}px 0`,
    },
    "& li": { margin: `${theme.spacing(0.5)}px 0` },
    "& blockquote": {
      borderLeft: "4px solid #ccc",
      paddingLeft: theme.spacing(2),
      fontStyle: "italic",
      margin: `${theme.spacing(2)}px 0`,
      color: "#666",
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      "&:hover": { color: theme.palette.primary.dark },
    },
    "& strong": { fontWeight: "bold" },
    "& em": { fontStyle: "italic" },
    "& u": { textDecoration: "underline" },
  },
  placeholder: {
    position: "absolute",
    top: 16,
    left: 16,
    color: "#999",
    pointerEvents: "none",
    userSelect: "none",
  },
}));

export const RichTextEditor = ({
  name = "",
  value = "",
  onChange = () => {},
  placeholder = "Start typing...",
  maxChars = null,
  height = "auto",
  minHeight = "150px",
  maxHeight = null,
  sx = {},
  style,
}) => {
  const classes = useStyles();
  const editorRef = useRef(null);
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const [linkTooltipPosition, setLinkTooltipPosition] = useState({
    x: 0,
    y: 0,
  });
  const [currentLink, setCurrentLink] = useState("");
  const [isLinkEdit, setIsLinkEdit] = useState(false);
  const [storedRange, setStoredRange] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      let html = editorRef.current.innerHTML;
      if (maxChars) {
        const plain = getPlainText(html);
        if (plain.length > maxChars) {
          // Truncate to maxChars
          html = cleanHTML(plain.slice(0, maxChars));
          editorRef.current.innerHTML = html;
        }
      }
      onChange({ target: { name, value: html } });
    }
  }, [onChange, name, maxChars]);

  const handleFormat = useCallback(
    (command, value) => {
      if (command === "createLink") {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
          // Store the current range before showing tooltip
          const range = selection.getRangeAt(0).cloneRange();
          setStoredRange(range);
          const rect = range.getBoundingClientRect();
          const editorRect = editorRef.current?.getBoundingClientRect();
          if (editorRect) {
            setLinkTooltipPosition({
              x: rect.left - editorRect.left + rect.width / 2,
              y: rect.bottom - editorRect.top + 5,
            });
            setCurrentLink("");
            setIsLinkEdit(false);
            setShowLinkTooltip(true);
          }
        } else {
          // No text selected, show tooltip at cursor position
          const range = selection?.getRangeAt(0);
          if (range) {
            setStoredRange(range.cloneRange());
            const rect = range.getBoundingClientRect();
            const editorRect = editorRef.current?.getBoundingClientRect();
            if (editorRect) {
              setLinkTooltipPosition({
                x: rect.left - editorRect.left,
                y: rect.bottom - editorRect.top + 5,
              });
              setCurrentLink("");
              setIsLinkEdit(false);
              setShowLinkTooltip(true);
            }
          }
        }
        return;
      }
      if (command === "removeFormat") {
        document.execCommand("removeFormat", false, null);
        handleInput();
        return;
      }
      applyFormatting(command, value);
      if (typeof editorRef?.current?.focus === "function") {
        editorRef.current.focus();
      }
      handleInput();
    },
    [handleInput]
  );

  const handleLinkSubmit = useCallback(
    (url) => {
      insertLink(url, storedRange || undefined);
      setShowLinkTooltip(false);
      setStoredRange(null);
      if (typeof editorRef?.current?.focus === "function") {
        editorRef.current.focus();
      }
      handleInput();
    },
    [handleInput, storedRange]
  );

  const handleClick = useCallback((e) => {
    const target = e.target;
    if (target.tagName === "A") {
      e.preventDefault();
      const rect = target.getBoundingClientRect();
      const editorRect = editorRef.current?.getBoundingClientRect();
      if (editorRect) {
        setLinkTooltipPosition({
          x: rect.left - editorRect.left + rect.width / 2,
          y: rect.bottom - editorRect.top + 5,
        });
        setCurrentLink(target.getAttribute("href") || "");
        setIsLinkEdit(true);
        setShowLinkTooltip(true);
      }
    } else {
      setShowLinkTooltip(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      // Handle common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            handleFormat("bold");
            break;
          case "i":
            e.preventDefault();
            handleFormat("italic");
            break;
          case "u":
            e.preventDefault();
            handleFormat("underline");
            break;
          case "k":
            e.preventDefault();
            handleFormat("createLink");
            break;
          case "s":
            e.preventDefault();
            handleFormat("strikeThrough");
            break;
          case "e":
            e.preventDefault();
            handleFormat("removeFormat");
            break;
        }
      }

      if (e.key === "Escape") {
        setShowLinkTooltip(false);
        setStoredRange(null);
      }
    },
    [handleFormat]
  );

  // Character counter logic
  const plainText = getPlainText(value);
  const charsLeft = maxChars ? maxChars - plainText.length : null;

  return (
    <Paper elevation={1} className={classes.paper} style={style} sx={sx}>
      <Toolbar onFormat={handleFormat} showStrikethrough showCleanFormat />
      <Box style={{ position: "relative" }}>
        <Box
          ref={editorRef}
          contentEditable
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={handleInput}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={classes.editor}
          style={{
            minHeight,
            height,
            maxHeight,
            overflowY: maxHeight ? "auto" : undefined,
          }}
          suppressContentEditableWarning
        />
        {(!editorRef.current || editorRef.current.innerHTML === "") &&
          !isFocused && (
            <Box className={classes.placeholder}>{placeholder}</Box>
          )}
        {showLinkTooltip && (
          <LinkTooltip
            position={linkTooltipPosition}
            onSubmit={handleLinkSubmit}
            onClose={() => {
              setShowLinkTooltip(false);
              setStoredRange(null);
            }}
            initialValue={currentLink}
            isEdit={isLinkEdit}
          />
        )}
        {maxChars && (
          <Box
            sx={{
              position: "absolute",
              right: 8,
              bottom: 4,
              fontSize: "0.75rem",
              color: charsLeft < 0 ? "error.main" : "text.secondary",
              pointerEvents: "none",
            }}
          >
            {charsLeft} characters remaining
          </Box>
        )}
      </Box>
    </Paper>
  );
};
