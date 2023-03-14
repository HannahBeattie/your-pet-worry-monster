import { Image, View } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	interpolate,
	SensorType,
	SharedValue,
	useAnimatedSensor,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated'

const PI = Math.PI
const HALF_PI = PI / 2

type Props = {
	image: any
	order: number
	scrollOffset: SharedValue<number>
}

export default function ParallaxScroll({ image, order, scrollOffset }: Props) {
	const IMAGE_OFFSET = 100
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()
	const [scale] = useState(Math.random() + 1)

	const randomDirection = Math.random() > 0.5 ? 1 : -1 // Generate a random direction for the image to move
	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		return {
			top: withTiming(
				interpolate(-pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET, order + IMAGE_OFFSET]),
				{
					duration: 100,
				}
			),

			left: withTiming(
				interpolate(
					-roll,
					[-PI, PI],
					[
						-IMAGE_OFFSET * 2 * order,
						0 + randomDirection * Math.abs(roll) * 0.1, // Modify the left offset to include a random direction
					]
				),
				{
					duration: 100,
				}
			),

			transform: [{ translateX: scrollOffset.value / 1.5 }],
		}
	})
	return (
		<View flex={1}>
			<Animated.View
				style={[
					imageStyle,
					{
						height: (scale * height) / 3,
						width: scale * width,
						top: -200,
						position: 'relative',
					},
				]}
			>
				<Image source={image} alt={'spatter'} flex={1} resizeMode={'contain'} />
			</Animated.View>
		</View>
	)
}
