import { useRouter } from 'expo-router'
import { Button, Heading, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'

export default function Intro(): JSX.Element {
	const [step, setStep] = useState(0)
	const router = useRouter()

	const [fadeAnim] = useState(new Animated.Value(0))
	// const updateStep = () => {
	// 	if (step === stepValues.length - 1) {
	// 		// router.push('/monsterMenu')
	// 	}
	// 	setStep(step + 1)
	// }

	const updateStep = () => {
		const newStep = step + 1
		if (newStep >= stepValues.length) {
			// If we've reached the end of the steps, navigate to "/hello" page
			// router.push('/hello')
			// Reset the step to 0 to start over if the user navigates back to this component
			setStep(0)
		} else {
			setStep(newStep % stepValues.length)
		}
	}
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 10, // duration of the animation in milliseconds
			useNativeDriver: true, // required for performance reasons on Android
		}).start()
	}, [step, fadeAnim])

	const stepValues = ['GRRRRR', 'ROOOOWWllll', 'I am the ferroooccioouus', 'Worry Monster!']

	useEffect(() => {
		const interval = setInterval(() => {
			const newStep = step + 1
			if (newStep >= stepValues.length) {
				// If we've reached the end of the steps, navigate to "/hello" page
				// router.push('/hello')
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
