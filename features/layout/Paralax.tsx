import { View, VStack } from 'native-base'
import React, { useRef } from 'react'
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	useWindowDimensions,
} from 'react-native'
import DisplayWorry from '~features/worries/DisplayWorry'
import SlideX from './SlideX'

export default function Paralax() {
	const { height, width } = useWindowDimensions()
	const scrollViewRef = useRef<ScrollView>(null)

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const scrollX = event.nativeEvent.contentOffset.x
		// console.log('Scroll X position:', scrollX)
	}

	const images = [
		require('../../assets/spatter01.png'),
		require('../../assets/spatter02.png'),
		require('../../assets/spatter03.png'),
	]

	return (
		<View flex={1} backgroundColor={'gray.900'}>
			<ScrollView
				overScrollMode='never'
				horizontal
				ref={scrollViewRef}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<VStack flex={1} minW={width} backgroundColor={'gray.900'}>
					<VStack flex={1} minW={width}>
						<SlideX imageArray={images} />
						<DisplayWorry />
						<SlideX imageArray={images.reverse()} />
					</VStack>
				</VStack>
			</ScrollView>
		</View>
	)
}
