export const IVIEW_MIN_HEIGHT = 55;
export const IVIEW_MIN_WIDTH = 100;

/**
 * Проверяем HTML-атрибуты width/height в первую очередь —
 * они точнее отражают намеренный размер (стикер 40x40).
 * Фоллбэк на naturalWidth/naturalHeight — если атрибуты не заданы.
 */
export function isLargeImage(img: HTMLImageElement): boolean {
  const attrH = img.getAttribute("height");
  const attrW = img.getAttribute("width");

  const htmlH = attrH ? parseInt(attrH, 10) : null;
  const htmlW = attrW ? parseInt(attrW, 10) : null;

  if (htmlH !== null || htmlW !== null) {
    const h = htmlH ?? Infinity;
    const w = htmlW ?? Infinity;
    return h >= IVIEW_MIN_HEIGHT || w >= IVIEW_MIN_WIDTH;
  }

  return img.naturalHeight >= IVIEW_MIN_HEIGHT || img.naturalWidth >= IVIEW_MIN_WIDTH;
}
