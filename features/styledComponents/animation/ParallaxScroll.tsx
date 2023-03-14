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
import { useSelector } from 'react-redux'
import { selectAllInactive } from '~features/worries/worrySlice'

const PI = Math.PI
const HALF_PI = PI / 2

export default function ParallaxScroll({ image, order }: any) {
	const IMAGE_OFFSET = 10
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1))
		return {
			top: withTiming(
				interpolate(pitch, [-HALF_PI, HALF_PI], [(-IMAGE_OFFSET * 2) / order, 0]),
				{
					duration: 100,
				}
			),
			left: withTiming(interpolate(roll, [-PI, PI], [(-IMAGE_OFFSET * 2) / order, 0]), {
				duration: 100,
			}),
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
