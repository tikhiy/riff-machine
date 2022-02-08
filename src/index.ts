import { getDuration, Fraction } from "./core"
import {
  BAR_WIDTH,
  GRID_COLOR_0,
  GRID_COLOR_1,
  GRID_COLOR_2,
  GRID_COLOR_3,
  HEIGHT,
  VOICE_COLOR_01,
  WIDTH,
} from "./core/constants"
import { INode, Note } from "./core/types"
// import { generate } from "./core/generator"
import { Seed160 } from "./core/random"
import { IProps } from "./types"
import { props } from "./props"
import { state } from "./state"
import { canvas } from "./canvas"
import { onInput } from "./events"
import { score } from "./score"

// const score = generate()

console.log(score)

const isNote = (node: INode<unknown>): node is INode<Note> =>
  typeof node.value === "string"

const createKnob = (name: keyof IProps): HTMLElement => {
  const container = document.createElement("div")
  const input = document.createElement("input")
  const label = document.createElement("label")

  container.appendChild(label)
  container.appendChild(input)
  container.classList.add("knob-container")
  input.name = name
  input.step = String(1)
  label.htmlFor = name
  label.textContent = name

  switch (name) {
    case "seed":
      input.value = Seed160.toString(props[name])
      break
    default:
      input.type = "number"
      input.value = String(props[name])
  }

  return container
}

const backgroundColor = "#ffffff"
const context = canvas.getContext("2d")!
const px = (number: number) => `${number}px`

const append = () => {
  document.body.appendChild(canvas)

  for (const name of Object.keys(props) as (keyof IProps)[]) {
    document.body.appendChild(createKnob(name))
  }
}

const resize = () => {
  canvas.height = HEIGHT
  canvas.style.height = px(HEIGHT)
  canvas.style.width = px(WIDTH)
  canvas.width = WIDTH
}

const initialize = () => {
  append()
  resize()
}

const background = () => {
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, WIDTH, HEIGHT)
}

const lines = () => {
  for (let i = 0; i < props.quantization * 4 + 1; ++i) {
    const w = (state.scale.x * BAR_WIDTH) / props.quantization
    const h = HEIGHT
    const x = state.position.x + i * w
    const y = 0

    if (i % props.quantization === 0) {
      context.fillStyle = GRID_COLOR_0
    } else if (i % (props.quantization / 2) === 0) {
      context.fillStyle = GRID_COLOR_1
    } else if (i % (props.quantization / 4) === 0) {
      context.fillStyle = GRID_COLOR_2
    } else {
      context.fillStyle = GRID_COLOR_3
    }

    context.fillRect(x, y, 1, h)
  }
}

// FIXME: cache processing
const notes = () => {
  for (let i = 0; i < score.length; ++i) {
    const deepest = [...score[i]!.deepest()]
    let offset = 0

    for (let j = 0; j < deepest.length; ++j) {
      const node = deepest[j]!
      const w =
        state.scale.x * (BAR_WIDTH / Fraction.valueOf(getDuration(node)))
      const h = state.scale.y * 50

      if (isNote(node)) {
        const x = state.position.x + state.scale.x * BAR_WIDTH * i + offset
        const y = state.position.y + state.scale.y * 200
        const padding = 2

        context.fillStyle = VOICE_COLOR_01
        context.fillRect(
          x + padding,
          y + padding,
          w - padding * 2,
          h - padding * 2,
        )
      }

      offset += w
    }
  }
}

const render = () => {
  background()
  lines()
  notes()
  requestAnimationFrame(render)
}

initialize()
render()

document.body.addEventListener("input", onInput)
