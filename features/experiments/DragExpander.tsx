import { Box, Heading, Text, VStack } from 'native-base'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

const snaps = {
	up: 80,
	down: 300,
	half: 0, // halfway between up and down, computed below
	escape: 20,
}
snaps.half = (snaps.down - snaps.up) / 2 + snaps.up

export default function DragExpander() {
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
						<Heading alignSelf='center'>Hello</Heading>
						<Animated.View style={[styleDetails, { width: '100%' }]}>
							<Text p={8}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
								ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
								aliquip ex ea commodo consequat.
							</Text>
						</Animated.View>
					</VStack>
				</Animated.View>
				<Box flex={1} p={16} />
			</VStack>
		</GestureDetector>
	)
}
