import { Image, View } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	SensorType,
	useAnimatedSensor,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from 'react-native-reanimated'

const PI = Math.PI
const HALF_PI = PI / 2

export default function ParallaxScroll({ image, order }: any) {
	const IMAGE_OFFSET = 10
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		const tilt = interpolate(roll, [-PI, PI], [-2, 2]) // Define the tilt angle based on the roll sensor value
		const direction = roll > 0 ? -2 : 2 // Determine the direction of movement based on the sign of the roll sensor value
		return {
			top: withTiming(
				interpolate(yaw, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET, order + IMAGE_OFFSET], 0),
				{
					duration: 200,
				}
			),
			right: withTiming(interpolate(roll, [-PI, PI], [-IMAGE_OFFSET * 2, order, 0]), {
				duration: 200,
			}),
			transform: [
				{ rotate: `${tilt}deg` },
				{ translateX: withTiming(direction, { duration: 300 }) },
			],
		}
	})
	return (
		<View flex={1}>
			<Animated.View
				style={[
					{
						flex: 1,
						height: height + IMAGE_OFFSET,
						width: width + 2 + IMAGE_OFFSET,
					},
					imageStyle,
				]}
			>
				<Image
					position='absolute'
					height={height + IMAGE_OFFSET}
					width={width + 2 + IMAGE_OFFSET}
					source={image}
					alt={'spatter'}
					flex={1}
					resizeMode={'contain'}
				/>
			</Animated.View>
		</View>
	)
}
