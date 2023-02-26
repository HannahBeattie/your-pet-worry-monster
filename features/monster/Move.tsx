import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { Button, HStack, Image, VStack } from 'native-base'
import { default as React, useEffect, useState } from 'react'
import { Animated, ImageBackground, StyleSheet } from 'react-native'

const base = require('../../assets/base.png')
const stepValues = [
	require('../../assets/blue.png'),
	require('../../assets/one.png'),
	require('../../assets/two.png'),
	require('../../assets/three.png'),
	require('../../assets/four.png'),
	require('../../assets/five.png'),
]

const three = require('../../assets/three.png')

export default function Move() {
	const [step, setStep] = useState(0)
	const [fadeAnim] = useState(new Animated.Value(0))
	const router = useRouter()

	const updateStep = () => {
		const newStep = step + 1
		if (newStep >= stepValues.length) {
			setStep(0)
		} else {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			setStep(newStep % stepValues.length)
		}
	}

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2,
			useNativeDriver: true,
		}).start()
	}, [step, fadeAnim])

	useEffect(() => {
		const interval = setInterval(() => {
			const newStep = step + 1
			if (newStep >= stepValues.length) {
				setStep(0)
			} else {
				setStep(newStep % stepValues.length)
			}
		}, 2000)

		return () => clearInterval(interval)
	}, [step, stepValues])

	const handleButtonClick = () => {
		updateStep()
	}

	const img = stepValues[step]
	console.log(`step values are ${stepValues}, step: ${step}, img: ${img}`)

	return (
		<VStack flex={1}>
			<ImageBackground source={stepValues[0]} resizeMode='contain' style={styles.image}>
				<Image
					key={`img-${step}`}
					minH={'full'}
					flex={1}
					resizeMode='contain'
					source={stepValues[step]}
					alt={'blue'}
				/>
			</ImageBackground>

			<Button backgroundColor={'red.100'} onPress={handleButtonClick}>
				CLICK
			</Button>
		</VStack>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,

		justifyContent: 'center',
	},
})
