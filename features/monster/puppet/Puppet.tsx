import { VStack } from 'native-base'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
	runOnJS,
	runOnUI,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import PuppetPart from './PuppetPart'
import { Mood, Pos, numParts, parts, pickRandomMood } from './puppetParts'

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
	mood?: Mood
}

const offScreenOffsets: Record<OffScreenDir, Pos> = {
	left: { x: -400, y: 0 },
	right: { x: 400, y: 0 },
	top: { x: 0, y: -800 },
	bottom: { x: 0, y: 650 },
}

type RecursiveFn = (fn: RecursiveFn) => void

export default function Puppet({
	numWorries,
	offScreen,
	offScreenDir,
	mood: moodProp,
}: PuppetProps) {
	const [didLayout, setDidLayout] = useState(false)
	const [imgsLoaded, setImgsLoaded] = useState(0)
	const [mood, setMood] = useState(moodProp ?? 'happy')

	const allLoaded = useMemo(() => imgsLoaded >= numParts, [imgsLoaded])

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
	const isUserPressed = useSharedValue(false)
	const isAutoPressed = useSharedValue(0)
	const isPressed = useDerivedValue(() => {
		const auto = isAutoPressed.value > 0
		return auto || isUserPressed.value
	})
	const press = useSharedValue({ x: 0, y: 0 })
	const originSpringX = useDerivedValue(() =>
		withSpring(originX.value, { stiffness: 300, damping: 20 })
	)
	const originSpringY = useDerivedValue(() =>
		withSpring(originY.value, { stiffness: 300, damping: 20 })
	)

	const layout = useSharedValue({ x: 0, y: 0, width: 1, height: 1 })

	const setRandomMood = useCallback(() => {
		const randMood = pickRandomMood()
		setMood(randMood)
	}, [])
	const setDefaultMood = useCallback(() => {
		setMood(moodProp ?? 'happy')
	}, [moodProp])

	const finalizeAfter = useCallback((delay: number) => {
		setTimeout(() => {
			if (!isUserPressed.value) {
				return
			}
			setDefaultMood()
			runOnUI(() => {
				press.value = { x: 0, y: 0 }
				isUserPressed.value = false
				isAutoPressed.value = 0
			})()
		}, delay)
	}, [])

	const skipUpdate = useSharedValue(-1)
	const gesture = Gesture.Pan()
		.onBegin((evt) => {
			isUserPressed.value = true
			press.value = { x: evt.x, y: evt.y }
			originX.value = evt.translationX * baseGain + start.value.x
			originY.value = evt.translationY * baseGain + start.value.y
			runOnJS(setRandomMood)()
		})
		.onUpdate((evt) => {
			// try to improve performance by only processing every tenth event
			skipUpdate.value = (skipUpdate.value + 1) % 10
			if (skipUpdate.value > 0) {
				return
			}
			// update wasn't skipped, handle changes
			press.value = { x: evt.x, y: evt.y }
			originX.value = clampOffX(evt.translationX * baseGain + start.value.x)
			originY.value = clampOffY(evt.translationY * baseGain + start.value.y)
		})
		.onEnd(() => {
			originX.value = 0
			originY.value = 0
			runOnJS(finalizeAfter)(0)
		})
		.onFinalize(() => {
			runOnJS(finalizeAfter)(Math.random() * 9000 + 3000)
		})

	// Do random pretend presses to make Blue look around when they're bored
	const lookAround = useCallback(
		(fn: RecursiveFn) => {
			'worklet'
			const randX = Math.random() * layout.value.width
			const randY = Math.random() * layout.value.height
			const delayMin = 5000
			const delayMax = 12000
			const delayVal = Math.random() * (delayMax - delayMin) + delayMin
			const delayMin2 = 1500
			const delayMax2 = 4000
			const delayVal2 = Math.random() * (delayMax2 - delayMin2) + delayMin2
			isAutoPressed.value = withSequence(
				withDelay(
					delayVal,
					withTiming(1, { duration: 0 }, (finished) => {
						if (finished) {
							if (!isUserPressed.value) {
								press.value = { x: randX, y: randY }
							}
							runOnJS(setRandomMood)()
						}
					})
				),
				withDelay(
					delayVal2,
					withTiming(0, { duration: 0 }, (finished) => {
						if (finished) {
							runOnJS(setDefaultMood)()
						}
						fn(fn)
					})
				)
			)
		},
		[isUserPressed, isAutoPressed, press, layout]
	)
	useEffect(() => {
		runOnUI(lookAround)(lookAround)
	}, [lookAround])

	useEffect(() => {
		// jump in/out of view based on load state and offScreen prop
		if (!allLoaded) {
			return
		}
		runOnUI(() => {
			originX.value = offScreen ? enterX : 0
			originY.value = offScreen ? enterY : 0
		})()
	}, [allLoaded, offScreen])

	const animProps = useMemo(
		() => ({
			layout,
			originX,
			originY,
			originSpringX,
			originSpringY,
			isPressed,
			press,
		}),
		[layout, originX, originY, originSpringX, originSpringY, isPressed, press]
	)

	const onPartLoad = useCallback(() => setImgsLoaded((prev) => prev + 1), [])

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
					parts.map((part) => {
						return (
							<PuppetPart
								key={`puppet-part-${part.name}`}
								{...{ part, allLoaded, numWorries, offScreen }}
								animProps={animProps}
								onLoad={onPartLoad}
								mood={mood}
							/>
						)
					})}
			</VStack>
		</GestureDetector>
	)
}
