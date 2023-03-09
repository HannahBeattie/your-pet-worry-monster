import { WithSpringConfig } from 'react-native-reanimated'

export type Pos = {
	x: number
	y: number
}

export type PartName = string

type WobbleOpts = {
	min: number
	max: number
	springOpts?: WithSpringConfig
	timingOpts?: { minDuration: number; maxDuration: number }
}

export type Part = {
	name: PartName
	src: any
	left: number
	w: number
	top: number
	h: number
	rot?: number
	rotWobble?: WobbleOpts
	pivot?: Pos
	doubleSpring?: boolean
	gain?: Pos
	look?: number
	springOpts?: WithSpringConfig
	minWorries?: number
	subparts?: Part[]
	subpartsUnder?: boolean
	_isSubpart?: boolean
}

const noGain: Pos = { x: 0, y: 0 }
const headGain = { x: 1.1, y: 1.1 } as Pos

export const parts: Part[] = [
	{
		name: 'legL',
		src: require('../../../assets/monsterParts/leg-left.png'),
		left: 0.53461,
		w: 0.27582,
		top: 0.48885,
		h: 0.45497,
		pivot: { x: 0.61754, y: 0.73971 },
		doubleSpring: true,
		gain: { x: 1.0, y: 0.35 },
		springOpts: { stiffness: 230, damping: 16 },
		look: -0.015,
	},
	{
		name: 'legR',
		src: require('../../../assets/monsterParts/leg-right.png'),
		left: 0.31125,
		w: 0.23033,
		top: 0.50014,
		h: 0.4567,
		pivot: { x: 0.4249, y: 0.73331 },
		doubleSpring: true,
		gain: { x: 0.8, y: 0.35 },
		springOpts: { stiffness: 300, damping: 16 },
		look: -0.015,
	},
	{
		name: 'armL',
		src: require('../../../assets/monsterParts/arm-left.png'),
		left: 0.445,
		w: 0.48,
		top: 0.4,
		h: 0.22262,
		pivot: { x: 0.35, y: 0.1 },
		rotWobble: { min: -8, max: 2, springOpts: { stiffness: 10, damping: 1.1 } },
		doubleSpring: true,
		springOpts: { stiffness: 300, damping: 18 },
		look: -0.017,
		subpartsUnder: true,
		subparts: [
			{
				name: 'worriesL',
				src: require('../../../assets/monsterParts/worries-left.png'),
				left: 0.69918,
				w: 0.23566,
				top: 0.54156,
				h: 0.19867,
				minWorries: 2,
			},
		],
	},
	{
		name: 'armR',
		src: require('../../../assets/monsterParts/arm-right.png'),
		left: 0.02344,
		w: 0.54057,
		top: 0.37353,
		h: 0.26859,
		pivot: { x: 0.75, y: 0.15 },
		rot: 10,
		rotWobble: { min: -2, max: 8, springOpts: { stiffness: 9, damping: 1.1 } },
		doubleSpring: true,
		springOpts: { stiffness: 150, damping: 12 },
		look: -0.014,
		subpartsUnder: true,
		subparts: [
			{
				name: 'worriesR',
				src: require('../../../assets/monsterParts/worries-right.png'),
				left: 0.02959,
				w: 0.35328,
				top: 0.53752,
				h: 0.28555,
				minWorries: 1,
			},
		],
	},
	{
		name: 'neck',
		src: require('../../../assets/monsterParts/neck.png'),
		left: 0.4473,
		w: 0.11034,
		top: 0.22805,
		h: 0.18852,
	},
	{
		name: 'body',
		src: require('../../../assets/monsterParts/body.png'),
		left: 0.30117,
		w: 0.42247,
		top: 0.27734,
		h: 0.54863,
		springOpts: { stiffness: 80, damping: 10 },
		look: -0.01,
	},
	{
		name: 'head',
		src: require('../../../assets/monsterParts/head-blank.png'),
		left: 0.20873,
		w: 0.56611,
		top: 0.04022,
		h: 0.35408,
		pivot: { x: 0.5, y: 0.7 },
		rotWobble: { min: -4, max: 4, springOpts: { stiffness: 20, damping: 6 } },
		gain: headGain,
		subparts: [
			{
				name: 'mouth',
				src: require('../../../assets/monsterParts/mouth-pleased.png'),
				left: 0.32051,
				w: 0.38061,
				top: 0.27618,
				h: 0.10289,
			},
			{
				name: 'eyes',
				src: require('../../../assets/monsterParts/eyes-blank.png'),
				left: 0.26482,
				w: 0.44311,
				top: 0.14479,
				h: 0.14564,
			},
			{
				name: 'pupilL',
				src: require('../../../assets/monsterParts/pupil-left.png'),
				left: 0.59736,
				w: 0.05689,
				top: 0.19125,
				h: 0.04019,
				look: 0.02,
			},
			{
				name: 'pupilR',
				src: require('../../../assets/monsterParts/pupil-right.png'),
				left: 0.33854,
				w: 0.0625,
				top: 0.20607,
				h: 0.04275,
				look: 0.02,
			},
		],
	},
]

// Update subpart positions/gains to adjust for parent values
for (const part of parts) {
	for (const sub of part.subparts ?? []) {
		sub.left -= part.left
		sub.top -= part.top
		sub.gain = noGain // leave it to the parent to respond to user pan gestures
		sub._isSubpart = true
	}
}

export const partNames = parts
	.map((part) => [part.name, ...(part.subparts?.map((pp) => pp.name) ?? [])])
	.flat()
export const numParts = partNames.length
// console.log(`${numParts} parts:`, partNames)

// const WW = 1080
// const HH = WW * 1.406 // width-to-height ratio for the full puppet
// let mogrify = ''
// for (const name of partNames) {
// 	const { w, h, src } = parts[name]
// 	const newW = Math.ceil(w * WW)
// 	const newH = Math.ceil(h * HH)
// 	const newWH = `${newW}x${newH}`
// 	mogrify += `mogrify -scale ${newWH} ${src.replace(/..\/..\/assets\/monsterParts\//, '')}\n`
// }
// console.log(mogrify)
