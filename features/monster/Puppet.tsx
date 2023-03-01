import { Image, VStack } from 'native-base'
import { useState } from 'react'
import { LayoutRectangle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	WithSpringConfig,
	runOnJS,
	runOnUI,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

const aspect = 1.0 / 1.406 // width-to-height ratio for the full puppet

type Pos = {
	x: number
	y: number
}

type Part = {
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
}

type PartName =
	| 'legL'
	| 'legR'
	| 'armL'
	| 'armR'
	| 'body'
	| 'head'
	| 'mouth'
	| 'eyes'
	| 'pupilL'
	| 'pupilR'

const partNames = [
	'legL',
	'legR',
	'armL',
	'armR',
	'body',
	'head',
	'mouth',
	'eyes',
	'pupilL',
	'pupilR',
] as PartName[]

const headGain = { x: 1.1, y: 1.1 } as Pos

const parts: Record<PartName, Part> = {
	legL: {
		src: require('../../assets/monsterParts/leg-left.png'),
		left: 0.583,
		w: 0.213,
		top: 0.53556,
		h: 0.40683,
		pivot: { x: 0.61754, y: 0.73971 },
		doubleSpring: true,
		gain: { x: 0.8, y: 0.3 },
		springOpts: { stiffness: 230, damping: 12 },
	},
	legR: {
		src: require('../../assets/monsterParts/leg-right.png'),
		left: 0.304,
		w: 0.198,
		top: 0.52916,
		h: 0.43101,
		pivot: { x: 0.4249, y: 0.73331 },
		doubleSpring: true,
		gain: { x: 0.8, y: 0.3 },
		springOpts: { stiffness: 340, damping: 16 },
	},
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
	},
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
	},
	body: {
		src: require('../../assets/monsterParts/body.png'),
		left: 0,
		w: 1,
		top: 0,
		h: 1,
		springOpts: { stiffness: 80, damping: 10 },
	},
	head: {
		src: require('../../assets/monsterParts/head-blank.png'),
		left: 0.20873,
		w: 0.56611,
		top: 0.04731,
		h: 0.33746,
		gain: headGain,
	},
	mouth: {
		src: require('../../assets/monsterParts/mouth-pleased.png'),
		left: 0.32051,
		w: 0.38061,
		top: 0.27618,
		h: 0.10289,
		gain: headGain,
	},
	eyes: {
		src: require('../../assets/monsterParts/eyes-blank.png'),
		left: 0.26482,
		w: 0.44311,
		top: 0.14479,
		h: 0.14564,
		gain: headGain,
	},
	pupilL: {
		src: require('../../assets/monsterParts/pupil-left.png'),
		left: 0.59736,
		w: 0.05689,
		top: 0.19125,
		h: 0.04019,
		look: 0.02,
		gain: headGain,
	},
	pupilR: {
		src: require('../../assets/monsterParts/pupil-right.png'),
		left: 0.33854,
		w: 0.0625,
		top: 0.20607,
		h: 0.04275,
		look: 0.02,
		gain: headGain,
	},
}

function animStyleForPart({
	layout,
	part,
	origin,
	originSpring,
	isPressed,
	press,
}: {
	layout: LayoutRectangle
	part: Part
	origin: Pos
	originSpring: Pos
	isPressed: boolean
	press: Pos
}) {
	'worklet'
	const ll = layout
	const { left, w, top, h, rot, doubleSpring, gain, look, springOpts } = part
	const oo = doubleSpring ? originSpring : origin
	let lookOffX = 0
	let lookOffY = 0
	if (look && isPressed) {
		const dx = press.x - (ll.x + ll.width * (left + w / 2))
		const dy = press.y - (ll.y + ll.height * (top + h / 2))
		const distPress = Math.sqrt(dx * dx + dy * dy)
		const dirX = dx / distPress
		const dirY = dy / distPress
		lookOffX = look * dirX
		lookOffY = look * dirY
	}
	const gg = gain ?? { x: 1, y: 1 }
	return {
		transform: [
			{ translateX: withSpring(oo.x * gg.x + lookOffX * ll.width, springOpts) },
			{ translateY: withSpring(oo.y * gg.y + lookOffY * ll.height, springOpts) },
			{ rotate: `${rot ?? 0}deg` },
		],
		left: ll.x + ll.width * left,
		width: ll.width * w,
		top: ll.y + ll.height * top,
		height: ll.height * h,
	}
}

function log(...args: any[]) {
	console.log(...args)
}

export default function Puppet() {
	const [rerender, setRerender] = useState(0)

	const start = useSharedValue({ x: 0, y: 0 })
	const originX = useSharedValue(0)
	const originY = useSharedValue(0)
	const isPressed = useSharedValue(false)
	const press = useSharedValue({ x: 0, y: 0 })
	const originSpringX = useDerivedValue(() =>
		withSpring(originX.value, { stiffness: 300, damping: 20 })
	)
	const originSpringY = useDerivedValue(() =>
		withSpring(originY.value, { stiffness: 300, damping: 20 })
	)

	const layout = useSharedValue({ x: 0, y: 0, width: 1, height: 1 })

	const gesture = Gesture.Pan()
		.onBegin(() => {
			isPressed.value = true
			// runOnJS(log)('onBegin')
		})
		.onUpdate((evt) => {
			// runOnJS(log)('onUpdate', evt.translationX, evt.translationY)
			press.value = { x: evt.x, y: evt.y }
			originX.value = evt.translationX * 0.35 + start.value.x
			originY.value = evt.translationY * 0.35 + start.value.y
		})
		.onEnd(() => {
			isPressed.value = false
			// runOnJS(log)('onEnd')
			// origin.value = { x: 0, y: 0 }
			originX.value = 0
			originY.value = 0
		})

	const animStyles: Partial<Record<PartName, any>> = {}
	for (const partName of partNames) {
		const part = parts[partName]
		animStyles[partName] = useAnimatedStyle(() => {
			return animStyleForPart({
				layout: layout.value,
				part,
				origin: { x: originX.value, y: originY.value },
				originSpring: { x: originSpringX.value, y: originSpringY.value },
				isPressed: isPressed.value,
				press: press.value,
			})
		})
	}

	return (
		<GestureDetector gesture={gesture}>
			<VStack
				flex={1}
				position='relative'
				onLayout={({ nativeEvent }) => {
					const ll = nativeEvent.layout
					const layoutAspect = ll.width / ll.height
					const imgLayout = { ...ll }
					if (layoutAspect > aspect) {
						// layout is wider than image
						imgLayout.width = ll.height * aspect
						imgLayout.x = (ll.width - imgLayout.width) / 2
					} else {
						imgLayout.height = ll.width / aspect
						imgLayout.y = (ll.height - imgLayout.height) / 2
					}
					setTimeout(() => setRerender(+new Date()), 1000)
					// console.log(layoutAspect, aspect, nativeEvent.layout, imgLayout)
					runOnUI((layoutVals) => {
						'worklet'
						layout.value = layoutVals
					})(imgLayout)
				}}
			>
				{/* {!golive && (
				<Image
					position='absolute'
					width='full'
					height='full'
					left={0}
					top={0}
					right={0}
					bottom={0}
					// opacity={0.1}
					alt={'blue the monster'}
					source={noWorries}
					flex={1}
					resizeMode='contain'
					zIndex={10}
				/>
			)} */}
				{partNames.map((partName) => {
					const { src } = parts[partName]
					return (
						<Animated.View
							key={`part-${partName}`}
							style={[animStyles[partName], { position: 'absolute' }]}
						>
							<Image
								key={`img-part-${partName}-${rerender}`}
								alt={`blue's ${partName}`}
								source={src}
								flex={1}
								resizeMode='contain'
							/>
						</Animated.View>
					)
				})}
			</VStack>
		</GestureDetector>
	)
}
