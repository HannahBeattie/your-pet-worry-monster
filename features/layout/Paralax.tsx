import React, { useRef } from 'react'
import {
	ScrollView,
	NativeScrollEvent,
	NativeSyntheticEvent,
	useWindowDimensions,
} from 'react-native'
import { Heading, View, VStack } from 'native-base'
import ScrollXGallery from './SlideX'
import { useSelector } from 'react-redux'
import { selectAllInactive } from '~features/worries/worrySlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import SlideX from './SlideX'

export default function Paralax() {
	const { height, width } = useWindowDimensions()
	const scrollViewRef = useRef<ScrollView>(null)

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const scrollX = event.nativeEvent.contentOffset.x
		console.log('Scroll X position:', scrollX)
	}

	let worryData = useSelector(selectAllInactive).reverse()
	let entries = worryData.map(function (value) {
		return {
			time: useFormatDate(value.id),
			title: value.description,
			description: value.extraNote,
		}
	})

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
						<SlideX worryArray={entries} />
						<SlideX imageArray={images.reverse()} />
					</VStack>
				</VStack>
			</ScrollView>
		</View>
	)
}
