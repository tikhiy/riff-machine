import { isElement, isHTMLInputElement } from "./core"
import { Seed160, random } from "./core/random"
import { props } from "./props"
import { IProps } from "./types"

export const onInput = ({ target }: Event): void => {
  if (target && isElement(target) && isHTMLInputElement(target)) {
    const name = target.name as keyof IProps

    switch (name) {
      case "seed":
        const seed = Seed160.from(target.value)
        props[name] = seed
        random.seed(seed)
        break
      case "quantization":
        switch (typeof props[name]) {
          case "number":
            const value = Number.parseFloat(target.value)

            if (!Number.isNaN(value)) {
              props[name] = value
            }
        }
    }
  }
}
