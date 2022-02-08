import { clamp, vec2 } from "../core"
import {
  MAX_SCALE,
  MIN_SCALE,
  POSITION_FACTOR_ALT,
  SCALE_FACTOR_MOUSEMOVE,
  SCALE_FACTOR_WHEEL,
} from "./constants"
import { state } from "../state"
import { canvas } from "./canvas"
import { MMB } from "../core/constants"
import { IVec2 } from "../core/types"

const position = (x: number, y: number): void => {
  const newPosition = vec2(
    Math.min(0, state.position.x + x),
    Math.min(0, state.position.y + y),
  )

  state.position = newPosition
}

const scale = (x: number, y: number, origin: IVec2): void => {
  const newScale = vec2(
    clamp(state.scale.x + x, MIN_SCALE, MAX_SCALE),
    clamp(state.scale.y + y, MIN_SCALE, MAX_SCALE),
  )

  const ox = state.position.x - origin.x
  const oy = state.position.y - origin.y

  position(
    (ox / state.scale.x) * newScale.x - ox,
    (oy / state.scale.y) * newScale.y - oy,
  )

  state.scale = newScale
}

export const onWheel = (event: WheelEvent): void => {
  const { ctrlKey, deltaY, offsetX, offsetY } = event

  if (ctrlKey) {
    const origin = vec2(offsetX, offsetY)

    scale(SCALE_FACTOR_WHEEL / deltaY, 0, origin)
  }

  event.preventDefault()
}

export const onMousemove = (event: MouseEvent): void => {
  const {
    altKey,
    buttons,
    ctrlKey,
    movementX,
    movementY,
    offsetX,
    offsetY,
  } = event

  if (buttons & MMB) {
    const origin = vec2(offsetX, offsetY)

    if (ctrlKey) {
      const movement = movementY / SCALE_FACTOR_MOUSEMOVE

      if (altKey) {
        scale(movement, 0, origin)
      } else {
        scale(0, movement, origin)
      }
    } else if (altKey) {
      position(movementX * POSITION_FACTOR_ALT, 0)
    } else {
      position(movementX, movementY)
    }
  }

  event.preventDefault()
}

export const onMousedown = (event: MouseEvent): void => {
  const { buttons } = event

  if (buttons & MMB) {
    canvas.requestPointerLock()
    event.preventDefault()
  }
}

export const onMouseup = (): void => {
  document.exitPointerLock()
}
