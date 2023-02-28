import { Box, Heading, Text, VStack } from 'native-base'
import { FC, PropsWithChildren, ReactElement } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

export type DragExpanderProps = PropsWithChildren<{
	expanded?: ReactElement
}>

const DragExpander: FC<DragExpanderProps> = ({ children, expanded }) => {
	const snaps = {
		down: 250, // y location when not expanded
		up: 80, // y location when expanded
		half: 0, // halfway between up and down, computed below
		escape: 20, // how far you have to drag before it flips to the other snap point
	}
	snaps.half = (snaps.down - snaps.up) / 2 + snaps.up

	const isUp = useSharedValue(false) // start out not-expanded
	const isPressed = useSharedValue(false) // we're actually not using this right now, but you could use it to adjust scale/etc based on if the user is currently pressing
	const offY = useSharedValue(snaps.down) // y-location ("offset") for the components that are being animated
	const startY = useSharedValue(snaps.down) // y-location when the user started the pan gesture, used for internal computations in the gesture handlers
	const style = useAnimatedStyle(() => ({
		transform: [{ translateY: offY.value }],
		height: interpolate(
			offY.value,
			[snaps.down - snaps.escape, snaps.up + snaps.escape],
			[100, 480],
			Extrapolation.CLAMP
		),
	}))
	const styleDetails = useAnimatedStyle(() => ({
		opacity: interpolate(offY.value, [snaps.half, snaps.up], [0, 1], Extrapolation.CLAMP),
	}))
	const gesture = Gesture.Pan()
		.onBegin(() => {
			isPressed.value = true
		})
		.onUpdate((e) => {
			// update y offset based on how far the user has dragged since the start of the gesture
			offY.value = e.translationY + startY.value
		})
		.onEnd(() => {
			// Now that the gesture has finished, we're going to snap to either the 'down' or the 'up' snap point
			// First, figure out how far we've dragged away from the current snap point
			const diff = isUp.value ? offY.value - snaps.up : snaps.down - offY.value
			if (diff > snaps.escape) {
				// We've dragged enough to escape the current snap, toggle isUp
				isUp.value = !isUp.value
			}
			// Choose our snap target based on the updated value of isUp
			const snapTo = isUp.value ? snaps.up : snaps.down
			// Spring to our snap target!
			offY.value = withSpring(snapTo)
			startY.value = withSpring(snapTo)
		})
		.onFinalize(() => {
			isPressed.value = false
		})

	return (
		<GestureDetector gesture={gesture}>
			<VStack alignItems='stretch' flex={1}>
				<Animated.View style={[style, { backgroundColor: '#38c' }]}>
					<VStack alignItems='stretch' py={8}>
						{children}
						<Animated.View style={[styleDetails, { width: '100%' }]}>
							{expanded}
						</Animated.View>
					</VStack>
				</Animated.View>
			</VStack>
		</GestureDetector>
	)
}
export default DragExpander
