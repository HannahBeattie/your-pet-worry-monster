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
		up: 80,
		down: 250,
		half: 0, // halfway between up and down, computed below
		escape: 20,
	}
	snaps.half = (snaps.down - snaps.up) / 2 + snaps.up

	const isPressed = useSharedValue(false)
	const isUp = useSharedValue(false)
	const offY = useSharedValue(snaps.down)
	const startY = useSharedValue(snaps.down)
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
			offY.value = e.translationY + startY.value
		})
		.onEnd(() => {
			const diff = isUp.value ? offY.value - snaps.up : snaps.down - offY.value
			if (diff > snaps.escape) {
				// We've dragged enough to escape the current snap, toggle isUp!
				isUp.value = !isUp.value
			}
			const snapTo = isUp.value ? snaps.up : snaps.down
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
