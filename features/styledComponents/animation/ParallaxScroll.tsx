import { Image, View } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	Extrapolate,
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

const IMAGE_OFFSET = 100
const PARALLAX_GAIN = 0.7

export default function ParallaxScroll({ image, order, scrollOffset }: Props) {
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()
	const [scale] = useState(Math.random() + 1)

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		return {
			top: withTiming(
				interpolate(
					-pitch,
					[-HALF_PI, HALF_PI],
					[-IMAGE_OFFSET, IMAGE_OFFSET],
					Extrapolate.CLAMP
				),
				{
					duration: 100,
				}
			),

			left: withTiming(
				interpolate(
					-roll,
					[-HALF_PI, HALF_PI],
					[-IMAGE_OFFSET, IMAGE_OFFSET],
					Extrapolate.CLAMP
				),
				{
					duration: 100,
				}
			),

			transform: [{ translateX: PARALLAX_GAIN * scrollOffset.value }],
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
