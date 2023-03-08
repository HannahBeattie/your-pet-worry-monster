import { LayoutRectangle } from 'react-native'
import { WithSpringConfig, withSpring } from 'react-native-reanimated'

export type Pos = {
	x: number
	y: number
}

export type Part = {
	src: any
	left: number
	w: number
	top: number
	h: number
	rot?: number
	pivot?: Pos
	doubleSpring?: boolean
	gain?: Pos
	look?: number
	springOpts?: WithSpringConfig
	minWorries?: number
}

const headGain = { x: 1.1, y: 1.1 } as Pos

export const parts = {
	legL: {
		src: require('../../assets/monsterParts/leg-left.png'),
		left: 0.53461,
		w: 0.27582,
		top: 0.48885,
		h: 0.45497,
		pivot: { x: 0.61754, y: 0.73971 },
		doubleSpring: true,
		gain: { x: 1.0, y: 0.35 },
		springOpts: { stiffness: 230, damping: 16 },
		look: -0.015,
	} as Part,
	legR: {
		src: require('../../assets/monsterParts/leg-right.png'),
		left: 0.31125,
		w: 0.23033,
		top: 0.50014,
		h: 0.4567,
		pivot: { x: 0.4249, y: 0.73331 },
		doubleSpring: true,
		gain: { x: 0.8, y: 0.35 },
		springOpts: { stiffness: 300, damping: 16 },
		look: -0.015,
	} as Part,
	armL: {
		src: require('../../assets/monsterParts/arm-left.png'),
		left: 0.445,
		w: 0.48,
		top: 0.4,
		h: 0.22262,
		rot: 180,
		pivot: { x: 0.6146, y: 0.40139 },
		doubleSpring: true,
		springOpts: { stiffness: 300, damping: 18 },
		look: -0.017,
	} as Part,
	armR: {
		src: require('../../assets/monsterParts/arm-right.png'),
		left: 0.0,
		w: 0.58,
		top: 0.41681,
		h: 0.20368,
		rot: 164,
		pivot: { x: 0.39478, y: 0.3985 },
		doubleSpring: true,
		springOpts: { stiffness: 150, damping: 12 },
		look: -0.014,
	} as Part,
	worriesL: {
		src: require('../../assets/monsterParts/worries-left.png'),
		left: 0.69918,
		w: 0.23566,
		top: 0.54156,
		h: 0.19867,
		pivot: { x: 0.6146, y: 0.40139 },
		doubleSpring: true,
		springOpts: { stiffness: 300, damping: 18 },
		look: -0.017,
		minWorries: 2,
	} as Part,
	worriesR: {
		src: require('../../assets/monsterParts/worries-right.png'),
		left: 0.01959,
		w: 0.35328,
		top: 0.53752,
		h: 0.28555,
		pivot: { x: 0.39478, y: 0.3985 },
		doubleSpring: true,
		springOpts: { stiffness: 150, damping: 12 },
		look: -0.014,
		minWorries: 1,
	} as Part,
	neck: {
		src: require('../../assets/monsterParts/neck.png'),
		left: 0.4473,
		w: 0.11034,
		top: 0.22805,
		h: 0.18852,
	} as Part,
	body: {
		src: require('../../assets/monsterParts/body.png'),
		left: 0.30117,
		w: 0.42247,
		top: 0.27734,
		h: 0.54863,
		springOpts: { stiffness: 80, damping: 10 },
		look: -0.01,
	} as Part,
	head: {
		src: require('../../assets/monsterParts/head-blank.png'),
		left: 0.20873,
		w: 0.56611,
		top: 0.04731,
		h: 0.33746,
		gain: headGain,
	} as Part,
	mouth: {
		src: require('../../assets/monsterParts/mouth-pleased.png'),
		left: 0.32051,
		w: 0.38061,
		top: 0.27618,
		h: 0.10289,
		gain: headGain,
	} as Part,
	eyes: {
		src: require('../../assets/monsterParts/eyes-blank.png'),
		left: 0.26482,
		w: 0.44311,
		top: 0.14479,
		h: 0.14564,
		gain: headGain,
	} as Part,
	pupilL: {
		src: require('../../assets/monsterParts/pupil-left.png'),
		left: 0.59736,
		w: 0.05689,
		top: 0.19125,
		h: 0.04019,
		look: 0.02,
		gain: headGain,
	} as Part,
	pupilR: {
		src: require('../../assets/monsterParts/pupil-right.png'),
		left: 0.33854,
		w: 0.0625,
		top: 0.20607,
		h: 0.04275,
		look: 0.02,
		gain: headGain,
	} as Part,
}

export type Parts = typeof parts
export type PartName = keyof Parts

// partNames determines the layering order for the different parts
export const partNames = [
	'worriesL',
	'worriesR',
	'legL',
	'legR',
	'armL',
	'armR',
	'neck',
	'body',
	'head',
	'mouth',
	'eyes',
	'pupilL',
	'pupilR',
] as PartName[]

const defaultGain: Pos = { x: 1, y: 1 }

export function animStyleForPart({
	layout,
	part,
	origin,
	originSpring,
	isPressed,
	press,
	offScreen,
}: {
	layout: LayoutRectangle
	part: Part
	origin: Pos
	originSpring: Pos
	isPressed: boolean
	press: Pos
	offScreen: boolean
}) {
	'worklet'
	const ll = layout
	const { left, w, top, h, rot, doubleSpring, gain, look, springOpts } = part
	const oo = doubleSpring ? originSpring : origin
	const gg = offScreen ? defaultGain : gain ?? defaultGain
	const baseOffset = { x: oo.x * gg.x, y: oo.y * gg.y }
	const lookOffset = { x: 0, y: 0 }
	if (look && isPressed) {
		const dx = press.x - (ll.x + baseOffset.x + ll.width * (left + w / 2))
		const dy = press.y - (ll.y + baseOffset.y + ll.height * (top + h / 2))
		const distPress = Math.sqrt(dx * dx + dy * dy)
		const dirX = dx / distPress
		const dirY = dy / distPress
		lookOffset.x = look * dirX
		lookOffset.y = look * dirY
	}
	const finalOffset = {
		x: baseOffset.x + lookOffset.x * ll.width,
		y: baseOffset.y + lookOffset.y * ll.height,
	}
	return {
		transform: [
			{ translateX: withSpring(finalOffset.x, springOpts) },
			{ translateY: withSpring(finalOffset.y, springOpts) },
			{ rotate: `${rot ?? 0}deg` },
		],
		left: ll.x + ll.width * left,
		width: ll.width * w,
		top: ll.y + ll.height * top,
		height: ll.height * h,
	}
}

export type AnimStyleForPart = ReturnType<typeof animStyleForPart>

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
