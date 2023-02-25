import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import MyFab from '~features/layout/MyFab'

const blue = require('../assets/blue.png')

export default function Bounce() {
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, context) => {
			// context.translateX = translateX.value
			context.translateY = translateY.value
		},
		onActive: (event, context) => {
			// translateX.value = context.translateX + event.translationX
			translateY.value = context.translateY + event.translationY
		},
		onEnd: (event) => {
			translateX.value = withSpring(0)
			translateY.value = withSpring(0)
		},
	})

	const animatedStyle = useAnimatedStyle(() => ({
		// transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
		transform: [{ translateY: translateY.value }],
	}))

	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View style={[styles.button, animatedStyle]}>
					<Image alt={'blue the monster'} source={blue} flex={1} resizeMode='contain' />
				</Animated.View>
			</PanGestureHandler>
			<MyFab />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 300,
		height: 500,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
	},
})
