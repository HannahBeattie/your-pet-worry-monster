import { useRouter } from 'expo-router'
import { Button, Heading, Image, VStack } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import ZoomOut from '~features/layout/animation/ZoomOut'

export default function Intro(): JSX.Element {
	const imageAnim = useRef(new Animated.Value(0)).current
	const noWorries = require('../../assets/blue.png')
	const [step, setStep] = useState(0)
	const router = useRouter()
	const [fadeAnim] = useState(new Animated.Value(0))

	const updateStep = () => {
		const newStep = step + 1
		if (newStep >= stepValues.length) {
			router.push('/meetGreg')
			setStep(0)
		} else {
			setStep(newStep % stepValues.length)
		}
	}
	useEffect(() => {
		Animated.timing(fadeAnim, {
			delay: 2,
			toValue: 1,
			duration: 10, // duration of the animation in milliseconds
			useNativeDriver: true, // required for performance reasons on Android
		}).start()
	}, [step, fadeAnim])

	const stepValues = ['', '', 'GRRRRR', 'ROOOOWWllll', 'I am the ...', 'DREADED', 'WORRY MONSTER']

	useEffect(() => {
		const interval = setInterval(() => {
			const newStep = step + 1
			if (newStep >= stepValues.length) {
				router.push('/meetGreg')
				// Reset the step to 0 to start over if the user navigates back to this component
				setStep(0)
			} else {
				setStep(newStep % stepValues.length)
			}
		}, 3000) // change the delay time as needed (in milliseconds)

		return () => clearInterval(interval) // clear the interval when the component unmounts or updates
	}, [step, stepValues.length])

	return (
		<VStack variant='page' flex={1} alignItems='center'>
			<TouchableOpacity onPress={updateStep}>
				<Animated.View style={{ opacity: fadeAnim }}>
					<Heading fontSize={'3xl'} color={'white'}>
						{stepValues[step]}
					</Heading>
				</Animated.View>
			</TouchableOpacity>
		</VStack>
	)
}
