import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";

export const LinkTooltip = ({
  position,
  onSubmit,
  onClose,
  initialValue = "",
  isEdit = false,
}) => {
  const [url, setUrl] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setUrl(initialValue);
    // Focus the input after a brief delay to ensure it's rendered
    setTimeout(() => {
      typeof inputRef.current.focus === "function" && inputRef.current.focus();
      typeof inputRef.current.select === "function" &&
        inputRef.current.select();
    }, 50);
  }, [initialValue]);

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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleRemoveLink = () => {
    document.execCommand("unlink");
    onClose();
  };

  return (
    <Paper
      elevation={4}
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
        onSubmit={handleSubmit}
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
              type="submit"
              variant="contained"
              size="small"
              disabled={!url.trim()}
              sx={{ textTransform: "none" }}
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
