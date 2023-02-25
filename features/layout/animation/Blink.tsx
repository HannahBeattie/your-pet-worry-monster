import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
	runOnJS,
} from 'react-native-reanimated'

const BLINK_DURATION = 100 // duration of the blink animation in milliseconds
const BLINK_DELAY = 500 // delay between blink animations in milliseconds
const IMAGES = [
	require('../../../assets/blue.png'),
	require('../../../assets/blueSad.png'),
	require('../../../assets/blue.png'),
]

export default function Blink() {
	const blinkAnimation = useSharedValue(0)

	const animateBlink = (index: number) => {
		blinkAnimation.value = withTiming(1, { duration: BLINK_DURATION }, () => {
			blinkAnimation.value = withTiming(0, { duration: BLINK_DURATION }, () => {
				if (index === IMAGES.length - 1) {
					runOnJS(animateSequence)()
				} else {
					runOnJS(animateBlink)(index + 1)
				}
			})
		})
	}

	const animateSequence = () => {
		animateBlink(0)
	}

	React.useEffect(() => {
		animateSequence()
	}, [])

	const opacity1 = interpolate(blinkAnimation.value, [0, 1], [1, 0])
	const opacity2 = interpolate(blinkAnimation.value, [0, 1], [0, 1])
	const opacity3 = interpolate(blinkAnimation.value, [0, 1], [1, 0])

	return (
		<View style={styles.container}>
			{IMAGES.map((source, index) => (
				<Animated.Image
					key={index}
					source={source}
					style={[
						styles.image,
						useAnimatedStyle(() => ({
							opacity: index === 0 ? opacity1 : index === 1 ? opacity2 : opacity3,
						})),
					]}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	image: {
		position: 'absolute',
		flex: 1,
		maxHeight: 400,
		resizeMode: 'contain',
	},
})
