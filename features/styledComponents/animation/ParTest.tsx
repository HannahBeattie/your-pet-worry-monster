import { Image, View } from 'native-base'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	SensorType,
	useAnimatedSensor,
	useAnimatedStyle,
	withSpring,
	WithSpringConfig,
} from 'react-native-reanimated'

type ParallaxScrollProps = {
	image: any
	order: number
}

const ParTest = ({ image, order }: ParallaxScrollProps) => {
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()

	const springConfig: WithSpringConfig = {
		damping: 10,
		mass: 1,
		stiffness: 100,
		overshootClamping: false,
		restSpeedThreshold: 0.001,
		restDisplacementThreshold: 0.001,
		...(Platform.OS === 'android' && {
			// These values make the animation smoother on Android
			velocity: 0.001,
			deceleration: 0.997,
		}),
	}

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch } = sensor.value
		const moveLeftRight = interpolate(yaw, [-Math.PI / 2, Math.PI / 2], [-width / 3, width / 3])
		const moveUpDown = interpolate(
			pitch,
			[-Math.PI / 2, Math.PI / 2],
			[-height / 3, height / 3]
		)

		return {
			transform: [
				{ translateX: withSpring(-moveLeftRight, springConfig) },
				{ translateY: withSpring(moveUpDown, springConfig) },
			],
		}
	})

	return (
		<View flex={1}>
			<Animated.View style={[{ flex: 1, height: height, width: width }, imageStyle]}>
				<Image
					position='absolute'
					height={height}
					width={width}
					source={image}
					alt={'spatter'}
					flex={1}
					resizeMode={'contain'}
				/>
			</Animated.View>
		</View>
	)
}

export default ParTest
