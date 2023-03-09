import { Center } from 'native-base'
import React, { useState, useEffect } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated'
import MonsterVoice from '~features/styledComponents/MonsterVoice'

interface FadingTextProps {
	textArray: string[]
	duration: number
}

const FadingText: React.FC<FadingTextProps> = ({ textArray, duration }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const opacity = useSharedValue(1)
	const size = useSharedValue(0)

	useEffect(() => {
		opacity.value = 1
		size.value = 0.5
		size.value = withTiming(1, { duration: duration * 1 })
		opacity.value = withDelay(duration * 1, withTiming(0, { duration: duration * 3 }))
		const timeout = setTimeout(() => {
			setCurrentIndex((currentIndex) => (currentIndex + 1) % textArray.length)
		}, duration * 4)
		return () => clearTimeout(timeout)
	}, [currentIndex, duration, opacity, size, textArray])

	const text = textArray[currentIndex]

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ scale: size.value }],
		}
	})

	return (
		<Center flex={1}>
			<Animated.View style={animatedStyle}>
				<MonsterVoice sizeVal={80}>{text}</MonsterVoice>
			</Animated.View>
		</Center>
	)
}

export default FadingText
