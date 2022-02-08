import { clamp } from "../core"
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

export const onWheel = (event: WheelEvent): void => {
  const { ctrlKey, deltaY } = event

  if (ctrlKey) {
    state.scale.x = clamp(
      state.scale.x + SCALE_FACTOR_WHEEL / deltaY,
      MIN_SCALE,
      MAX_SCALE,
    )
  }

  event.preventDefault()
}

export const onMousemove = (event: MouseEvent): void => {
  const { altKey, ctrlKey, buttons, movementX, movementY } = event

  if (buttons & MMB) {
    if (ctrlKey) {
      if (altKey) {
        state.scale.x = clamp(
          state.scale.x + movementY / SCALE_FACTOR_MOUSEMOVE,
          MIN_SCALE,
          MAX_SCALE,
        )
      } else {
        state.scale.y = clamp(
          state.scale.y + movementY / SCALE_FACTOR_MOUSEMOVE,
          MIN_SCALE,
          MAX_SCALE,
        )
      }
    } else if (altKey) {
      state.position.x = Math.min(
        0,
        state.position.x - movementX * POSITION_FACTOR_ALT,
      )
    } else {
      state.position.x = Math.min(0, state.position.x + movementX)
      state.position.y = Math.min(0, state.position.y + movementY)
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
