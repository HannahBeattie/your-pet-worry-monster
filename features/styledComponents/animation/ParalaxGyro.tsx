import { Image, View } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated'
import { Gyroscope } from 'expo-sensors'

const PI = Math.PI
const HALF_PI = PI / 2

type Props = {
	image: any
	order: number
	scrollOffset: Animated.SharedValue<number>
}

const IMAGE_OFFSET = 100
const PARALLAX_GAIN = 0.3

export default function ParallaxGyro({ image, scrollOffset }: Props) {
	const [scale] = useState(Math.random() + 1)
	const { width, height } = useWindowDimensions()
	const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 })

	Gyroscope.addListener((gyroscopeData) => {
		setGyroscopeData(gyroscopeData)
	})

	return (
		<View flex={1}>
			<Animated.View
				style={[
					useAnimatedStyle(() => {
						const { x: pitch, y: yaw, z: roll } = gyroscopeData
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
					}),
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
