import { getDuration, Node, Fraction } from ".."
import { IFraction, INode } from "../types"
import { weightedRandom } from "@thi.ng/random"
import {
  HALF,
  HALF_TRIPLET,
  QUARTER,
  QUARTER_TRIPLET,
  EIGHTH,
  EIGHTH_TRIPLET,
  SIXTEENTH,
  SIXTEENTH_TRIPLET,
  THIRTY_SECOND,
  THIRTY_SECOND_TRIPLET,
} from "./constants"

import {
  CHANCE_HALF,
  CHANCE_HALF_TRIPLET,
  CHANCE_QUARTER,
  CHANCE_QUARTER_TRIPLET,
  CHANCE_EIGHTH,
  CHANCE_EIGHTH_TRIPLET,
  CHANCE_SIXTEENTH,
  CHANCE_SIXTEENTH_TRIPLET,
  CHANCE_THIRTY_SECOND,
  CHANCE_THIRTY_SECOND_TRIPLET,
} from "./constants"
import { random } from "../random"

// 180bpm half
const MAX_DURATION_MS = Math.round(666.6)
// 180bpm 16th triplet
const MIN_DURATION_MS = Math.round(55.5)

// 180bpm whole
const MAX_NOTE_DURATION_MS = Math.round(1333.3)
// 180bpm 8th
const MIN_NOTE_DURATION_MS = Math.round(166.6)

const BPM = 120
const BPM_CONSTANT = 240000

const getDurationMs = (duration: IFraction): number =>
  (BPM_CONSTANT / BPM) * Fraction.valueOf(duration)

const getWeight = (fraction: IFraction): number => {
  const normalized = Fraction.normalize(fraction)

  switch (normalized.d) {
    case HALF:
      return CHANCE_HALF
    case HALF_TRIPLET:
      return CHANCE_HALF_TRIPLET
    case QUARTER:
      return CHANCE_QUARTER
    case QUARTER_TRIPLET:
      return CHANCE_QUARTER_TRIPLET
    case EIGHTH:
      return CHANCE_EIGHTH
    case EIGHTH_TRIPLET:
      return CHANCE_EIGHTH_TRIPLET
    case SIXTEENTH:
      return CHANCE_SIXTEENTH
    case SIXTEENTH_TRIPLET:
      return CHANCE_SIXTEENTH_TRIPLET
    case THIRTY_SECOND:
      return CHANCE_THIRTY_SECOND
    case THIRTY_SECOND_TRIPLET:
      return CHANCE_THIRTY_SECOND_TRIPLET
  }

  return 1
}

const getRandomDenominator = (currentNode: INode<IFraction>): number => {
  const duration = getDuration(currentNode)
  const durationMs = getDurationMs(duration)
  const choices: number[] = []

  for (let choice = 2; durationMs / choice > MIN_DURATION_MS; ++choice) {
    if (durationMs / choice < MAX_DURATION_MS) {
      choices.push(choice)
    }
  }

  if (choices.length === 0) {
    return 1
  }

  const weights = choices.map((choice) =>
    getWeight(Fraction.from(duration.n, duration.d / choice)),
  )

  return weightedRandom(choices, weights, random)()
}

const getRandomNumerator = (
  currentNode: INode<IFraction>,
  i: number,
  d: number,
): number => {
  const currentDuration = getDuration(currentNode)
  const currentDurationMs = getDurationMs(currentDuration)
  const choices: number[] = [1]

  return 1
}

const generateNode = (): INode<IFraction> => {
  const node = new Node<IFraction>(Fraction.identity())
  let stack = [node]

  for (let i = 0; i < stack.length; ++i) {
    const currentNode = stack[i]!
    const randomDenominator = getRandomDenominator(currentNode)

    if (randomDenominator !== 1) {
      for (
        let i = 0, randomNumerator;
        i < randomDenominator;
        i += randomNumerator
      ) {
        randomNumerator = getRandomNumerator(currentNode, i, randomDenominator)

        currentNode.append(
          new Node<IFraction>(
            Fraction.from(randomNumerator, randomDenominator),
          ),
        )
      }
    }
  }

  return node
}

export const generate = (): INode<IFraction>[] => {
  return [generateNode()]
}
