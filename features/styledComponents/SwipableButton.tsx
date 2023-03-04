import React, { ReactNode } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolate,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

const BUTTON_WIDTH = Dimensions.get('screen').width - 48
const SWIPE_RANGE = BUTTON_WIDTH - 74

type SwipeButtonPropsType = {
	onSwipe: () => void
	children?: ReactNode
}

const SwipeableButton = ({ onSwipe, children }: SwipeButtonPropsType) => {
	const X = useSharedValue(0)

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.onUpdate((evt) => {
			const newValue = evt.translationX
			if (newValue >= 0 && newValue <= SWIPE_RANGE) {
				X.value = newValue
			}
		})
		.onEnd(() => {
			if (X.value < SWIPE_RANGE - 40) {
				X.value = withSpring(0)
			} else {
				runOnJS(onSwipe)()
			}
		})

	const AnimatedStyles = {
		swipeButton: useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateX: interpolate(
							X.value,
							[20, BUTTON_WIDTH],
							[0, BUTTON_WIDTH],
							Extrapolation.CLAMP
						),
					},
				],
			}
		}),
		swipeText: useAnimatedStyle(() => {
			return {
				opacity: interpolate(X.value, [10, BUTTON_WIDTH / 2], [1, 0], Extrapolate.CLAMP),
				transform: [
					{
						translateX: interpolate(
							X.value,
							[20, SWIPE_RANGE],
							[0, BUTTON_WIDTH / 4],
							Extrapolate.CLAMP
						),
					},
				],
			}
		}),
	}

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={[styles.swipeButtonContainer, AnimatedStyles.swipeButton]}>
				<Animated.Text style={AnimatedStyles.swipeText}>{children}</Animated.Text>
			</Animated.View>
		</GestureDetector>
	)
}

const styles = StyleSheet.create({
	swipeButtonContainer: {
		alignContent: 'center',
		alignSelf: 'center',
		width: BUTTON_WIDTH,
	},
	swipeButton: {
		position: 'absolute',
		top: 0,
		zIndex: 3,
	},
	swipeButtonDisabled: {
		backgroundColor: 'gray',
	},
})

export default SwipeableButton
