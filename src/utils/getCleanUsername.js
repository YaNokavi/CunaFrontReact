import DOMPurify from "dompurify";

export const getCleanUsername = (name) => {
  return DOMPurify.sanitize(name);
};
