import { useRouter } from 'expo-router'
import { Image, VStack } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import ZoomOut from '~features/layout/animation/ZoomOut'

const noWorries = require('../assets/blue.png')
function MeetGreg() {
	const router = useRouter()
	const textAnim = useRef(new Animated.Value(0)).current
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
			router.push('/nextIntro')
		}, 1000)

		// Clear the timeout when the component unmounts
		return () => clearTimeout(timeout)
	}, [])

	return (
		<VStack variant={'page'}>
			<TouchableOpacity
				onPress={() => {
					router.push('/nextIntro')
				}}
			>
				<ZoomOut>
					<Image
						alt={'blue the monster'}
						source={noWorries}
						flex={1}
						resizeMode='contain'
					/>
				</ZoomOut>
			</TouchableOpacity>
		</VStack>
	)
}

export default MeetGreg
