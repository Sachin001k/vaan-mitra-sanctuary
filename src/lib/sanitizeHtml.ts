import DOMPurify from "dompurify";

// Blog descriptions are rich text from the admin editor; strip scripts and event handlers before rendering.
export const sanitizeHtml = (value?: string | null) => DOMPurify.sanitize(value ?? "");
