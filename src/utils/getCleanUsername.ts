import DOMPurify from "dompurify";

export const getCleanUsername = (name: string): string => {
  return DOMPurify.sanitize(name);
};
