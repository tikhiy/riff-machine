export const isHTMLInputElement = (
  v: Element | HTMLInputElement,
): v is HTMLInputElement => v.nodeName === "INPUT"