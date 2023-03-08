import { Image, VStack } from 'native-base'
import { useEffect, useMemo, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	runOnUI,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { AnimStyleForPart, PartName, Pos, animStyleForPart, partNames, parts } from './puppetParts'

const aspect = 1.0 / 1.406 // width-to-height ratio for the full puppet

const baseGain = 0.33

const minOffX = -70
const maxOffX = 70
const minOffY = -70
const maxOffY = 70
function clamp(val: number, min: number, max: number) {
	'worklet'
	return Math.min(max, Math.max(min, val))
}
function clampOffX(val: number) {
	'worklet'
	return clamp(val, minOffX, maxOffX)
}
function clampOffY(val: number) {
	'worklet'
	return clamp(val, minOffY, maxOffY)
}

type OffScreenDir = 'left' | 'top' | 'right' | 'bottom'

export type PuppetProps = {
	numWorries?: number
	offScreen?: boolean
	offScreenDir?: OffScreenDir | 'random'
}

const offScreenOffsets: Record<OffScreenDir, Pos> = {
	left: { x: -400, y: 0 },
	right: { x: 400, y: 0 },
	top: { x: 0, y: -800 },
	bottom: { x: 0, y: 650 },
}

export default function Puppet({ numWorries, offScreen, offScreenDir }: PuppetProps) {
	const [didLayout, setDidLayout] = useState(false)
	const [imgsLoaded, setImgsLoaded] = useState(0)

	// Start from off-screen (either left, top, right, or bottom)
	const enterRand = useMemo(Math.random, [])
	let offDir = offScreenDir ?? 'random'
	if (offDir === 'random') {
		offDir =
			enterRand > 0.75
				? 'left'
				: enterRand > 0.5
				? 'top'
				: enterRand > 0.25
				? 'right'
				: 'bottom'
	}
	const { x: enterX, y: enterY } = offScreenOffsets[offDir]

	const start = useSharedValue({ x: 0, y: 0 })
	const originX = useSharedValue(enterX)
	const originY = useSharedValue(enterY)
	const isPressed = useSharedValue(false)
	const press = useSharedValue({ x: 0, y: 0 })
	const originSpringX = useDerivedValue(() =>
		withSpring(originX.value, { stiffness: 300, damping: 20 })
	)
	const originSpringY = useDerivedValue(() =>
		withSpring(originY.value, { stiffness: 300, damping: 20 })
	)

	const layout = useSharedValue({ x: 0, y: 0, width: 1, height: 1 })

	const skipUpdate = useSharedValue(-1)
	const gesture = Gesture.Pan()
		.onBegin((evt) => {
			isPressed.value = true
			press.value = { x: evt.x, y: evt.y }
			originX.value = evt.translationX * baseGain + start.value.x
			originY.value = evt.translationY * baseGain + start.value.y
		})
		.onUpdate((evt) => {
			skipUpdate.value = (skipUpdate.value + 1) % 4
			if (skipUpdate.value > 0) {
				// try to improve performance by only processing every fourth event
				return
			}
			press.value = { x: evt.x, y: evt.y }
			originX.value = clampOffX(evt.translationX * baseGain + start.value.x)
			originY.value = clampOffY(evt.translationY * baseGain + start.value.y)
		})
		.onEnd(() => {
			isPressed.value = false
			originX.value = 0
			originY.value = 0
		})

	useEffect(() => {
		if (imgsLoaded < partNames.length) {
			return
		}
		runOnUI(() => {
			originX.value = offScreen ? enterX : 0
			originY.value = offScreen ? enterY : 0
		})()
	}, [imgsLoaded, offScreen])

	const animStyles: Partial<Record<PartName, AnimStyleForPart>> = {}
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
				offScreen: offScreen || imgsLoaded < partNames.length,
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
					setTimeout(() => setDidLayout(true), 100)
					runOnUI((layoutVals) => {
						'worklet'
						layout.value = layoutVals
					})(imgLayout)
				}}
			>
				{didLayout && // don't render parts until initial layout is done
					partNames.map((partName) => {
						const { src, minWorries } = parts[partName]
						const allLoaded = imgsLoaded >= partNames.length ? 1 : 0
						const hasEnoughWorries = (numWorries ?? 0) >= (minWorries ?? 0)
						const opacity = allLoaded * (hasEnoughWorries ? 1 : 0)
						return (
							<Animated.View
								key={`part-${partName}`}
								style={[animStyles[partName], { position: 'absolute' }]}
							>
								<Image
									key={`img-part-${partName}`}
									alt={`blue's ${partName}`}
									source={src}
									flex={1}
									resizeMode='contain'
									onLoad={() => setImgsLoaded((prev) => prev + 1)}
									opacity={opacity}
								/>
							</Animated.View>
						)
					})}
			</VStack>
		</GestureDetector>
	)
}
