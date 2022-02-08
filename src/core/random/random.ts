import { XorWow } from "@thi.ng/random"
import { DEFAULT_SEED_160 } from "./constants"

export const random = new XorWow(DEFAULT_SEED_160)

// export const random = (upperBound: number): number =>
//   Math.floor(Math.random() * upperBound)
