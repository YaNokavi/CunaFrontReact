export const IVIEW_MIN_HEIGHT = 55;
export const IVIEW_MIN_WIDTH = 100;

export function isLargeImage(img: HTMLImageElement): boolean {
  const attrH = img.getAttribute("height") || img.style.height;
  const attrW = img.getAttribute("width") || img.style.width;

  console.log(attrH, attrW);

  const htmlH = attrH ? parseInt(attrH, 10) : null;
  const htmlW = attrW ? parseInt(attrW, 10) : null;

  if (htmlH !== null || htmlW !== null) {
    const h = htmlH ?? Infinity;
    const w = htmlW ?? Infinity;
    return h >= IVIEW_MIN_HEIGHT || w >= IVIEW_MIN_WIDTH;
  }

  return (
    img.naturalHeight >= IVIEW_MIN_HEIGHT || img.naturalWidth >= IVIEW_MIN_WIDTH
  );
}
