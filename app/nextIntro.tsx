import { useRouter } from 'expo-router'
import { Center, Image, VStack } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity } from 'react-native'

import TextSequence from '~features/monster/TextSequence'

export default function NextIntro() {
	const router = useRouter()
	const noWorries = require('../assets/blue.png')
	const textArray = [
		'',
		'I like to eat worries!',
		'...my name is...!',
		'...wait',
		"I don't have a name!",
		'What should I call mysel?',
	]
	const textAnim = useRef(new Animated.Value(0)).current

	// Call Animated.timing() to start the animation immediately when the component mounts
	Animated.timing(textAnim, {
		toValue: 1,
		duration: 1000,
		useNativeDriver: true,
	}).start()

	const imageAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const textAnimation = Animated.timing(textAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		})

		const imageAnimation = Animated.timing(imageAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		})

		Animated.parallel([textAnimation, imageAnimation]).start()

		// Navigate to the next page after two seconds
		const timeout = setTimeout(() => {
			router.push('/name')
		}, 2000)

		// Clear the timeout when the component unmounts
		return () => clearTimeout(timeout)
	}, [])

	return (
		<VStack variant={'page'} flex={1}>
			<Center>
				<TouchableOpacity
					onPress={() => {
						router.push('/name')
					}}
				>
					<TextSequence stepValues={textArray} rout={'/name'} />
				</TouchableOpacity>
			</Center>
		</VStack>
	)
}
