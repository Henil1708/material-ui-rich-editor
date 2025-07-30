import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

/**
 * LinkTooltip component for inserting and editing links
 * Provides a modal-like interface for link management
 */
export const LinkTooltip = ({
  position,
  onSubmit,
  onClose,
  initialValue = "",
  isEdit = false,
  tooltipRef,
  storedRange,
}) => {
  const [url, setUrl] = useState(initialValue);
  const inputRef = useRef(null);

  // Focus and select input when component mounts or initialValue changes
  useEffect(() => {
    setUrl(initialValue);
    // Focus the input after a brief delay to ensure it's rendered
    setTimeout(() => {
      if (inputRef.current && typeof inputRef.current.focus === "function") {
        inputRef.current.focus();
      }
      if (inputRef.current && typeof inputRef.current.select === "function") {
        inputRef.current.select();
      }
    }, 50);
  }, [initialValue]);

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      let formattedUrl = url.trim();
      // Add https:// if no protocol is specified
      if (!formattedUrl.match(/^https?:\/\//)) {
        formattedUrl = "https://" + formattedUrl;
      }
      onSubmit(formattedUrl);
    }
  };

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  /**
   * Handle link removal
   * Restores selection and removes the link
   */
  const handleRemoveLink = () => {
    if (storedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(storedRange);
    }
    document.execCommand("unlink");
    onClose();
  };

  return (
    <Paper
      elevation={4}
      ref={tooltipRef}
      sx={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translateX(-50%)",
        zIndex: 1000,
        p: 2,
        minWidth: 320,
        maxWidth: 400,
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {isEdit ? "Edit Link" : "Insert Link"}
        </Typography>

        <TextField
          inputRef={inputRef}
          fullWidth
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL (e.g., https://example.com)"
          variant="outlined"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              disabled={!url.trim()}
              sx={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              {isEdit ? "Update" : "Insert"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={onClose}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
          </Box>

          {isEdit && (
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={handleRemoveLink}
              sx={{ textTransform: "none" }}
            >
              Remove
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// PropTypes for type checking
LinkTooltip.propTypes = {
  /** Position object with x and y coordinates */
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  /** Callback function when link is submitted */
  onSubmit: PropTypes.func.isRequired,
  /** Callback function when tooltip is closed */
  onClose: PropTypes.func.isRequired,
  /** Initial URL value for the input field */
  initialValue: PropTypes.string,
  /** Whether the tooltip is in edit mode */
  isEdit: PropTypes.bool,
  /** Ref for the tooltip container */
  tooltipRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /** Stored range for link editing */
  storedRange: PropTypes.object,
};

// Default props
LinkTooltip.defaultProps = {
  initialValue: "",
  isEdit: false,
  tooltipRef: null,
  storedRange: null,
};
