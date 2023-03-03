import { FontAwesome } from '@expo/vector-icons'
import { ChevronRightIcon, HStack, Text, VStack } from 'native-base'
import React, { ReactComponentElement, ReactNode, useEffect } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	Extrapolate,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import CircleIconButton from './CircleIconButton'

const BUTTON_WIDTH = Dimensions.get('screen').width - 48
const SWIPE_RANGE = BUTTON_WIDTH - 74

type SwipeButtonPropsType = {
	onSwipe: () => void
	isLoading?: boolean
	text?: string
	children?: ReactNode
}

const SwipeableButton = ({ onSwipe, text, children, isLoading = false }: SwipeButtonPropsType) => {
	const name = useSelector(monsterNameSelector)
	const X = useSharedValue(0)

	useEffect(() => {
		if (!isLoading) {
			X.value = withSpring(0)
		}
	}, [isLoading])

	const animatedGestureHandler = useAnimatedGestureHandler({
		onActive: (e) => {
			const newValue = e.translationX
			if (newValue >= 0 && newValue <= SWIPE_RANGE) {
				X.value = newValue
			}
		},
		onEnd: () => {
			if (X.value < SWIPE_RANGE - 20) {
				X.value = withSpring(0)
			} else {
				runOnJS(onSwipe)()
			}
		},
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
				opacity: interpolate(X.value, [0, BUTTON_WIDTH / 4], [1, 0], Extrapolate.CLAMP),
				transform: [
					{
						translateX: interpolate(
							X.value,
							[20, SWIPE_RANGE],
							[0, BUTTON_WIDTH / 3],
							Extrapolate.CLAMP
						),
					},
				],
			}
		}),
	}

	return (
		<View style={styles.swipeButtonContainer}>
			<PanGestureHandler enabled={!isLoading} onGestureEvent={animatedGestureHandler}>
				<Animated.View style={[styles.swipeButton, AnimatedStyles.swipeButton]}>
					{isLoading ? (
						<FontAwesome name='chevron-right' size={36} color={'#ffffff67'} />
					) : (
						<HStack>
							<FontAwesome name='chevron-right' size={36} color={'#ffffff59'} />
						</HStack>
					)}
				</Animated.View>
			</PanGestureHandler>
			<Animated.Text style={AnimatedStyles.swipeText}>
				<HStack
					width={BUTTON_WIDTH}
					justifyContent={'center'}
					alignContent={'center'}
					pl={8}
					py={4}
				>
					<Text fontSize={'sm'} color={'gray.400'}>
						{' '}
						{text ? text : `Slide to feed ${name}`}
					</Text>
				</HStack>
			</Animated.Text>
		</View>
	)
}

const styles = StyleSheet.create({
	swipeButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: BUTTON_WIDTH,
		backgroundColor: '#00000057',
	},
	swipeButton: {
		position: 'absolute',
		left: 30,
		borderRadius: 200,
		zIndex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	swipeButtonDisabled: {
		backgroundColor: 'gray',
	},
})

export default SwipeableButton
