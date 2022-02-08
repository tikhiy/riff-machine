import { random } from "./random"
import { pickRandom } from "@thi.ng/random"

export const pick = <T>(array: T[]): T | undefined => pickRandom(array, random)

// export const pick = <T>(array: T[]): T | undefined =>
//   array[random(array.length)]
