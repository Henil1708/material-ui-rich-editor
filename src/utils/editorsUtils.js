/**
 * Utility functions for rich text editor operations
 * Provides formatting, selection, and content manipulation functions
 */

/**
 * Apply formatting to the selected text
 * @param {string} command - The formatting command
 * @param {string} value - Optional value for the command
 */
export const applyFormatting = (command, value = null) => {
  document.execCommand(command, false, value);
};

/**
 * Get information about the current selection
 * @returns {object|null} Selection information or null if no selection
 */
export const getSelectionInfo = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  return {
    selection,
    range: range.cloneRange(),
    text: selection.toString(),
    isCollapsed: selection.isCollapsed,
  };
};

/**
 * Insert a link at the specified range or current selection
 * @param {string} url - The URL to insert
 * @param {Range} range - Optional range to insert at
 */
export const insertLink = (url, range = null) => {
  const selection = window.getSelection();

  if (range) {
    // Restore the stored range
    selection.removeAllRanges();
    selection.addRange(range);
  }

  if (selection.isCollapsed) {
    // No text selected, insert the URL as both text and link
    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.textContent = url;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";

    range.insertNode(linkElement);
    range.setStartAfter(linkElement);
    range.setEndAfter(linkElement);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    // Text is selected, convert it to a link
    document.execCommand("createLink", false, url);

    // Set target and rel attributes for the created link
    const links = document.querySelectorAll('a[href="' + url + '"]');
    links.forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }
};

/**
 * Remove link formatting from the current selection
 */
export const removeLink = () => {
  document.execCommand("unlink");
};

/**
 * Check if the current selection has specific formatting
 * @param {string} command - The formatting command to check
 * @returns {boolean} Whether the formatting is active
 */
export const isFormatActive = (command) => {
  return document.queryCommandState(command);
};

/**
 * Get the current format block type
 * @returns {string} The current block format (h1, h2, h3, h4, h5, h6, p, blockquote)
 */
export const getCurrentBlockFormat = () => {
  const sel = window.getSelection();
  if (!sel?.anchorNode) return "p";

  let node =
    sel.anchorNode.nodeType === Node.ELEMENT_NODE
      ? sel.anchorNode
      : sel.anchorNode.parentElement;

  while (node) {
    const tag = node.tagName?.toUpperCase();

    if (["H1", "H2", "H3", "H4", "H5", "H6", "P", "BLOCKQUOTE"].includes(tag)) {
      return tag.toLowerCase();
    }

    // If we're in a list item, look inside it for block-level content
    if (tag === "LI") {
      const blockInside = Array.from(node.childNodes).find(
        (child) =>
          child.nodeType === Node.ELEMENT_NODE &&
          ["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(child.tagName)
      );

      if (blockInside) {
        return blockInside.tagName.toLowerCase();
      }

      return "p"; // Default block inside list item
    }

    node = node.parentElement;
  }

  return "p";
};

/**
 * Insert HTML at the current cursor position
 * @param {string} html - The HTML to insert
 */
export const insertHTML = (html) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const div = document.createElement("div");
    div.innerHTML = html;
    const fragment = document.createDocumentFragment();

    while (div.firstChild) {
      fragment.appendChild(div.firstChild);
    }

    range.insertNode(fragment);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

/**
 * Get the plain text content from HTML and count characters
 * @param {string} rawText - The HTML content
 * @returns {number} Character count of plain text content
 */
export const countContentRealLength = (rawText) => {
  if (!rawText) return 0;

  // Remove HTML tags using a regular expression
  const textContent = rawText.replace(/<\/?[^>]+(>|$)/g, "");

  // Count the length of the cleaned content
  const characterCount = textContent.length;

  return characterCount;
};

/**
 * Clean up HTML content by removing unnecessary tags and attributes
 * @param {string} html - The HTML to clean
 * @returns {string} Cleaned HTML
 */
export const cleanHTML = (html) => {
  if (!html) return "";

  // Create a temporary div to parse the HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Remove empty paragraphs and divs
  const emptyElements = div.querySelectorAll("p:empty, div:empty");
  emptyElements.forEach((el) => el.remove());

  // Remove style attributes (keep only semantic formatting)
  const elementsWithStyle = div.querySelectorAll("[style]");
  elementsWithStyle.forEach((el) => el.removeAttribute("style"));

  return div.innerHTML;
};
