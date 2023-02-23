import { Box, Heading, HStack, View, VStack } from 'native-base'
import React, { useRef } from 'react'
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	useWindowDimensions,
} from 'react-native'
import { useSelector } from 'react-redux'
import Blue from '~features/monster/Blue'
import Gregory from '~features/monster/Gregory'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import DisplayWorry from '~features/worries/DisplayWorry'
import ImageSlide from './ImageSlide'
import MyFab from './MyFab'
import SimpleHome from './SimpleHome'

export default function Paralax() {
	const { height, width } = useWindowDimensions()
	const scrollViewRef = useRef<ScrollView>(null)

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const scrollX = event.nativeEvent.contentOffset.x
		// console.log('Scroll X position:', scrollX)
	}

	const images = [
		require('../../assets/spatter03.png'),
		require('../../assets/spatter02.png'),
		require('../../assets/spatter01.png'),
	]
	const monster = useSelector(monsterNameSelector)
	return (
		<View flex={1} backgroundColor={'gray.900'}>
			<Heading fontWeight={'200'} position={'fixed'} right={-20} top={20} zIndex={10}>
				{monster}'s Food Diary
			</Heading>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				overScrollMode='never'
				horizontal
				ref={scrollViewRef}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<VStack flex={1} minW={width} backgroundColor={'gray.900'}>
					<VStack flex={1} minW={width}>
						<ImageSlide imageArray={images} />
						<DisplayWorry />
						<ImageSlide imageArray={images.reverse()} />
					</VStack>
				</VStack>
			</ScrollView>
			<Box p={8} position={'fixed'}>
				<SimpleHome />
			</Box>
		</View>
	)
}
