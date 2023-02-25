import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
} from 'react-native-reanimated'

const BLINK_INTERVAL = 500 // interval between blinks in milliseconds
const BLINK_DURATION = 100 // duration of the blink animation in milliseconds

export default function Blink() {
	const blinkAnimation = useSharedValue(0)

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			blinkAnimation.value = withTiming(1, { duration: BLINK_DURATION }, () => {
				blinkAnimation.value = withTiming(0, { duration: BLINK_DURATION })
			})
		}, BLINK_INTERVAL)

		return () => clearInterval(intervalId)
	}, [])

	const opacity = interpolate(blinkAnimation.value, [0, 1], [1, 0])

	return (
		<View style={styles.container}>
			<Image source={require('./images/character1.png')} style={styles.image} />
			<Animated.Image
				source={require('./images/character2.png')}
				style={[styles.image, useAnimatedStyle(() => ({ opacity })).value]}
			/>
			<Image source={require('./images/character3.png')} style={styles.image} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 100,
		height: 100,
	},
})
