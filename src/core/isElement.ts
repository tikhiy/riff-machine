export const isElement = (v: EventTarget | Element): v is Element =>
  "nodeType" in v && v.nodeType === Node.ELEMENT_NODE
