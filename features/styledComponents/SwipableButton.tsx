import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { Center, HStack, Icon, IconButton, Spacer, Text } from 'native-base'
import React, { ReactNode, useCallback } from 'react'
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
	onSwipe?: () => void
	onSwipeLeft?: () => void
	onBin?: () => void
	onEat?: () => void
	children?: ReactNode
}

const SwipeableButton = ({
	onSwipe,
	onSwipeLeft,
	onBin,
	children,
	onEat,
}: SwipeButtonPropsType) => {
	const X = useSharedValue(0)

	const _onSwipe = useCallback(() => onSwipe!(), [onSwipe])
	const _onSwipeLeft = useCallback(() => onSwipeLeft && onSwipeLeft(), [onSwipeLeft])

	const panGesture = Gesture.Pan()
		.activeOffsetX([-10, 10])
		.onUpdate((evt) => {
			const newValue = evt.translationX
			if (newValue > 0) {
				// right swipe
				const limitedValue = Math.min(newValue, 4 * 34)
				X.value = limitedValue
			} else {
				// left swipe
				const limitedValue = Math.max(newValue, -4 * 34)
				X.value = limitedValue
			}
		})

		.onEnd(() => {
			if (X.value > SWIPE_RANGE / 2) {
				runOnJS(_onSwipe)()
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
		deleteButton: useAnimatedStyle(() => {
			return {
				opacity: interpolate(X.value, [0, SWIPE_RANGE / 2], [0, 1], Extrapolation.CLAMP),
			}
		}),
	}

	return (
		<>
			<Center alignItems={'center'} justifyItems={'center'} justifyContent={'center'}>
				<Animated.View style={{ flex: 1, position: 'absolute' }}>
					<Center
						alignSelf={'center'}
						justifyItems={'center'}
						justifyContent={'center'}
						alignContent={'center'}
					>
						<HStack
							width={BUTTON_WIDTH - 30}
							backgroundColor={'#ffffff13'}
							p={4}
							borderRadius={20}
							borderWidth={1}
							borderColor={'gray.700'}
						>
							<Center>
								<IconButton
									colorScheme={'white'}
									icon={
										<Icon
											as={MaterialCommunityIcons}
											color={'gray.400'}
											name='silverware-fork-knife'
										/>
									}
									w={20}
									h={10}
									borderRadius={200}
									onPress={onEat}
								/>
								<Text opacity={40} fontSize={'xs'}>
									Feed Worry
								</Text>
							</Center>
							<Spacer />
							<Center>
								<IconButton
									colorScheme={'white'}
									icon={<Icon as={Entypo} color={'gray.400'} name='trash' />}
									w={20}
									h={10}
									borderRadius={200}
									onPress={onBin}
								/>
								<Text opacity={40} fontSize={'xs'}>
									Delete Worry
								</Text>
							</Center>
						</HStack>
					</Center>
				</Animated.View>
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
