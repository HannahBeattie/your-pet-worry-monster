import { Heading, Image, View, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	useAnimatedSensor,
	SensorType,
	useAnimatedStyle,
	interpolate,
	withTiming,
} from 'react-native-reanimated'

const IMAGE_OFFSET = 100
const PI = Math.PI
const HALF_PI = PI / 2

export default function ParallaxScroll({ image, order }: any) {
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1))
		return {
			left: withTiming(interpolate(roll, [-PI, PI], [(width + IMAGE_OFFSET) * order, 0]), {
				duration: 300,
			}),
			top: withTiming(
				interpolate(pitch, [-HALF_PI, HALF_PI], [(width + IMAGE_OFFSET) * order, 0]),
				{
					duration: 300,
				}
			),
		}
	})

	return (
		<View flex={1}>
			<Animated.View
				style={[
					{
						flex: 1,
						height: height + 2 + IMAGE_OFFSET,
						width: width + 2 + IMAGE_OFFSET,
					},
					imageStyle,
				]}
			>
				<Image
					position='absolute'
					height={height / 3 + 2 + IMAGE_OFFSET}
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
