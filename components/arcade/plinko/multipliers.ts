// multiplierImages
import multiplier0dot3Img from '@/assets/plinko/multiplier0.3.png'
import multiplier0dot5Img from '@/assets/plinko/multiplier0.5.png'
import multiplier1dot5Img from '@/assets/plinko/multiplier1.5.png'
import multiplier1Img from '@/assets/plinko/multiplier1.png'
import multiplier10Img from '@/assets/plinko/multiplier10.png'
import multiplier110Img from '@/assets/plinko/multiplier110.png'
import multiplier15Img from '@/assets/plinko/multiplier15.png'
import multiplier18Img from '@/assets/plinko/multiplier18.png'
import multiplier2Img from '@/assets/plinko/multiplier2.png'
import multiplier25Img from '@/assets/plinko/multiplier25.png'
import multiplier3Img from '@/assets/plinko/multiplier3.png'
import multiplier33Img from '@/assets/plinko/multiplier33.png'
import multiplier41Img from '@/assets/plinko/multiplier41.png'
import multiplier5Img from '@/assets/plinko/multiplier5.png'
import multiplier88Img from '@/assets/plinko/multiplier88.png'

import { LinesType, MultiplierType, MultiplierValues } from '@/interfaces/plinko'

const multiplierSounds = {
  110: "/sounds/multiplier-best.wav",
  88: "/sounds/multiplier-best.wav",
  41: "/sounds/multiplier-best.wav",
  33: "/sounds/multiplier-best.wav",
  25: "/sounds/multiplier-best.wav",
  18: "/sounds/multiplier-good.wav",
  15: "/sounds/multiplier-good.wav",
  10: "/sounds/multiplier-good.wav",
  5: "/sounds/multiplier-good.wav",
  3: "/sounds/multiplier-regular.wav",
  2: "/sounds/multiplier-regular.wav",
  1.5: "/sounds/multiplier-regular.wav",
  1: "/sounds/multiplier-regular.wav",
  0.5: "/sounds/multiplier-low.wav",
  0.3: "/sounds/multiplier-low.wav"
} as const

const multipliers = {
  110: {
    label: 'block-110',
    sound: "/sounds/multiplier-best.wav",
    img: multiplier110Img
  },
  88: {
    label: 'block-88',
    sound: "/sounds/multiplier-best.wav",
    img: multiplier88Img
  },
  41: {
    label: 'block-41',
    sound: "/sounds/multiplier-best.wav",
    img: multiplier41Img
  },
  33: {
    label: 'block-33',
    sound: "/sounds/multiplier-best.wav",
    img: multiplier33Img
  },
  25: {
    label: 'block-25',
    sound: "/sounds/multiplier-best.wav",
    img: multiplier25Img
  },
  18: {
    label: 'block-18',
    sound: "/sounds/multiplier-good.wav",
    img: multiplier18Img
  },
  15: {
    label: 'block-15',
    sound: "/sounds/multiplier-good.wav",
    img: multiplier15Img
  },
  10: {
    label: 'block-10',
    sound: "/sounds/multiplier-good.wav",
    img: multiplier10Img
  },
  5: {
    label: 'block-5',
    sound: "/sounds/multiplier-good.wav",
    img: multiplier5Img
  },
  3: {
    label: 'block-3',
    sound: "/sounds/multiplier-regular.wav",
    img: multiplier3Img
  },
  2: {
    label: 'block-2',
    sound: "/sounds/multiplier-regular.wav",
    img: multiplier2Img
  },
  1.5: {
    label: 'block-1.5',
    sound: "/sounds/multiplier-regular.wav",
    img: multiplier1dot5Img
  },
  1: {
    label: 'block-1',
    sound: "/sounds/multiplier-regular.wav",
    img: multiplier1Img
  },
  0.5: {
    label: 'block-0.5',
    sound: "/sounds/multiplier-low.wav",
    img: multiplier0dot5Img
  },
  0.3: {
    label: 'block-0.3',
    sound: "/sounds/multiplier-low.wav",
    img: multiplier0dot3Img
  }
} as const

export type MultipliersType = keyof typeof multipliers

export const getMultiplier = (value: MultipliersType): MultiplierType => {
  return multipliers[value] as unknown as MultiplierType
}

export const multiplyBlocks16Lines = [
  getMultiplier(110),
  getMultiplier(41),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(41),
  getMultiplier(110)
]

export const multiplyBlocks15Lines = [
  getMultiplier(88),
  getMultiplier(18),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(18),
  getMultiplier(88)
]
export const multiplyBlocks14Lines = [
  getMultiplier(41),
  getMultiplier(15),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(15),
  getMultiplier(41)
]
export const multiplyBlocks13Lines = [
  getMultiplier(41),
  getMultiplier(15),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(15),
  getMultiplier(41)
]
export const multiplyBlocks12Lines = [
  getMultiplier(33),
  getMultiplier(10),
  getMultiplier(3),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(3),
  getMultiplier(10),
  getMultiplier(33)
]
export const multiplyBlocks11Lines = [
  getMultiplier(25),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(2),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(2),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(25)
]
export const multiplyBlocks10Lines = [
  getMultiplier(25),
  getMultiplier(5),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(5),
  getMultiplier(25)
]
export const multiplyBlocks9Lines = [
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(2),
  getMultiplier(1.5),
  getMultiplier(0.3),
  getMultiplier(0.3),
  getMultiplier(1.5),
  getMultiplier(2),
  getMultiplier(5),
  getMultiplier(10)
]
export const multiplyBlocks8Lines = [
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5)
]

export const multiplyBlocksByLinesQnt = {
  8: multiplyBlocks8Lines,
  9: multiplyBlocks9Lines,
  10: multiplyBlocks10Lines,
  11: multiplyBlocks11Lines,
  12: multiplyBlocks12Lines,
  13: multiplyBlocks13Lines,
  14: multiplyBlocks14Lines,
  15: multiplyBlocks15Lines,
  16: multiplyBlocks16Lines
}

export function getMultiplierByLinesQnt(value: LinesType): MultiplierType[] {
  return multiplyBlocksByLinesQnt[value]
}

export function getMultiplierSound(value: MultiplierValues): string {
  return multiplierSounds[value]
}