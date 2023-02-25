import { MotiView } from 'moti'
import { Image, Text, VStack } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import ZoomOut from '~features/layout/animation/ZoomOut'

function MeetGreg() {
	const noWorries = require('../assets/blue.png')

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
	}, [])

	return (
		<VStack variant={'page'}>
			<ZoomOut>
				<Image alt={'blue the monster'} source={noWorries} flex={1} resizeMode='contain' />
			</ZoomOut>
		</VStack>
	)
}

export default MeetGreg
