import { Entypo } from '@expo/vector-icons'
import { Center, Icon, IconButton, Text } from 'native-base'
import React, { ReactNode, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
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
	onSwipeLeft?: () => void
	onBin?: () => void
	children?: ReactNode
}

const SwipeableButton = ({ onSwipe, onSwipeLeft, onBin, children }: SwipeButtonPropsType) => {
	const X = useSharedValue(0)
	const [showButton, setShowButton] = useState(true)

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.onUpdate((evt) => {
			const newValue = evt.translationX
			if (newValue > 0) {
				// right swipe
				setShowButton(false)
				X.value = newValue
			} else {
				// left swipe
				setShowButton(true)
				const limitedValue = Math.max(newValue, -4 * 34)
				X.value = limitedValue
			}
		})
		.onEnd(() => {
			if (X.value > SWIPE_RANGE / 2) {
				runOnJS(onSwipe)()
			} else if (X.value < -SWIPE_RANGE / 2) {
				// runOnJS(onSwipeLeft)()
			} else {
				X.value = withSpring(0)
			}
		})

	const AnimatedStyles = {
		swipeButton: useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateX: interpolate(
							X.value,
							[-BUTTON_WIDTH, BUTTON_WIDTH],
							[-BUTTON_WIDTH, BUTTON_WIDTH],
							Extrapolation.CLAMP
						),
					},
				],
			}
		}),
		swipeText: useAnimatedStyle(() => {
			return {
				opacity: interpolate(
					X.value,
					[-BUTTON_WIDTH / 2, BUTTON_WIDTH / 2],
					[1, 0],
					Extrapolation.CLAMP
				),
				transform: [
					{
						translateX: interpolate(
							X.value,
							[-SWIPE_RANGE, SWIPE_RANGE],
							[-BUTTON_WIDTH / 4, BUTTON_WIDTH / 4],
							Extrapolation.CLAMP
						),
					},
				],
			}
		}),
	}

	return (
		<>
			<Center>
				{showButton && (
					<Center
						position={'absolute'}
						backgroundColor={'#25252553'}
						p={4}
						borderRightRadius={'200'}
						borderWidth={1}
						borderColor={'gray.700'}
						right={10}
					>
						<IconButton
							colorScheme={'white'}
							icon={<Icon as={Entypo} color={'gray.600'} name='trash' />}
							w={20}
							h={10}
							borderRadius={200}
							onPress={onBin}
						></IconButton>
						<Text opacity={40} fontSize={'xs'}>
							Delete
						</Text>
					</Center>
				)}
				<GestureDetector gesture={panGesture}>
					<Animated.View
						style={[styles.swipeButtonContainer, AnimatedStyles.swipeButton]}
					>
						<Animated.Text style={AnimatedStyles.swipeText}>{children}</Animated.Text>
					</Animated.View>
				</GestureDetector>
			</Center>
		</>
	)
}

const styles = StyleSheet.create({
	swipeButtonContainer: {
		alignContent: 'center',
		alignSelf: 'center',
		width: BUTTON_WIDTH,
		backgroundColor: '#101010',
		borderRadius: 20,
		borderColor: '#ffffff14',
		borderWidth: 1,
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
