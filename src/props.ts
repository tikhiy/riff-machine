import { Seed160, random } from "./core/random"

export const props = {
  seed: Seed160.from(random.buffer),
  quantization: 16,
}
