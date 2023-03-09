import { LayoutRectangle } from 'react-native'
import {
	AnimatedTransform,
	runOnJS,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { Part, Pos } from './puppetParts'
import { useCallback, useEffect } from 'react'

const defaultGain: Pos = { x: 1, y: 1 }

export function useAnimatedPartProps({ part }: { part: Part }) {
	const rotate = useSharedValue(part.rot ?? 0)

	// Add some wobble if the part has defined the "rotWobble" prop
	const wobble = useCallback(() => {
		if (!part.rotWobble) {
			return
		}
		const { min, max, springOpts, timingOpts } = part.rotWobble
		const range = max - min
		const wobbleTo = Math.random() * range + min
		const delay = Math.random() * 2000

		if (springOpts) {
			rotate.value = withDelay(
				delay,
				withSpring(wobbleTo, springOpts, () => runOnJS(wobble)())
			)
		} else {
			const { minDuration, maxDuration } = timingOpts ?? {
				minDuration: 500,
				maxDuration: 2000,
			}
			const duration = Math.random() * (maxDuration ?? 2000) + (minDuration ?? 500)
			rotate.value = withDelay(
				delay,
				withTiming(wobbleTo, { duration }, () => runOnJS(wobble)())
			)
		}
	}, [rotate])

	useEffect(() => {
		wobble()
	}, [])

	return { rotate }
}

export function animStyleForPart({
	layout,
	part,
	origin,
	originSpring,
	isPressed,
	press,
	offScreen,
	rotate,
}: {
	layout: LayoutRectangle
	part: Part
	origin: Pos
	originSpring: Pos
	isPressed: boolean
	press: Pos
	offScreen: boolean
	rotate: number
}) {
	'worklet'
	const ll = layout
	const { left, w, top, h, pivot, doubleSpring, gain, look, springOpts, _isSubpart } = part
	const oo = doubleSpring ? originSpring : origin
	const gainOrDefault = gain ?? defaultGain
	const isNoGain = gainOrDefault.x === 0 && gainOrDefault.y === 0
	const gg = offScreen && !isNoGain ? defaultGain : gainOrDefault
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

	const width = ll.width * w
	const height = ll.height * h
	const lx = _isSubpart ? 0 : ll.x // layout offset -- zero for subparts because
	const ly = _isSubpart ? 0 : ll.y // they get their offset from their parent

	const transform = [] as AnimatedTransform
	const centerX = width / 2
	const centerY = height / 2
	const pivotX = centerX - (pivot?.x ?? width / 2) * width
	const pivotY = centerY - (pivot?.y ?? height / 2) * height
	if (pivot) {
		transform.push({ translateX: -pivotX }, { translateY: -pivotY })
	}
	transform.push({ rotate: `${rotate}deg` })
	if (pivot) {
		transform.push({ translateX: pivotX }, { translateY: pivotY })
	}
	transform.push(
		{ translateX: withSpring(finalOffset.x, springOpts) },
		{ translateY: withSpring(finalOffset.y, springOpts) }
	)

	return {
		transform,
		left: lx + ll.width * left,
		width,
		top: ly + ll.height * top,
		height,
	}
}

export type AnimStyleForPart = ReturnType<typeof animStyleForPart>
