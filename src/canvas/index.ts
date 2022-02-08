import { onMousedown, onMousemove, onMouseup, onWheel } from "./events"
import { canvas } from "./canvas"

canvas.addEventListener("mousedown", onMousedown)
canvas.addEventListener("mousemove", onMousemove)
canvas.addEventListener("mouseup", onMouseup)
canvas.addEventListener("wheel", onWheel)

export { canvas }
