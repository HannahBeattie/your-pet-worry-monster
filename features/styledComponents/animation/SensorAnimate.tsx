import { Heading, Image, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
	useAnimatedSensor,
	SensorType,
	useAnimatedStyle,
	interpolate,
	withTiming,
} from 'react-native-reanimated'

const spatter = require('../../../assets/spatter01.png')
const spatter2 = require('../../../assets/spatter02.png')
const spatter3 = require('../../../assets/spatter03.png')

const IMAGE_OFFSET = 50
const PI = Math.PI
const HALF_PI = PI / 2

function SesnorAnimate() {
	const sensVal = useAnimatedSensor(SensorType.ROTATION)
	const sensor = sensVal.sensor
	const { width, height } = useWindowDimensions()

	const imageStyle = useAnimatedStyle(() => {
		const { yaw, pitch, roll } = sensor.value
		console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1))
		return {
			top: withTiming(interpolate(pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET * 2, 100]), {
				duration: 100,
			}),
			left: withTiming(interpolate(roll, [-PI, PI], [IMAGE_OFFSET * 2, 0]), {
				duration: 100,
			}),
		}
	})
	return (
		<VStack flex={1}>
			<Heading>ParallaxScroll</Heading>
			<Animated.View
				style={[
					{
						position: 'absolute',
						height: height / 3 + 2 + IMAGE_OFFSET,
						width: width + 2 + IMAGE_OFFSET,
					},
					imageStyle,
				]}
			>
				<Image resizeMode='contain' flex={1} source={spatter} alt={'spatter'} />
			</Animated.View>
		</VStack>
	)
}

export default SesnorAnimate
