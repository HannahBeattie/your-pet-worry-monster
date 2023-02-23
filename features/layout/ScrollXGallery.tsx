import { Box, Heading, HStack, Image, VStack, Text, Tag } from 'native-base'
import React, { useRef } from 'react'
import { Animated, ImageSourcePropType, ScrollView, useWindowDimensions } from 'react-native'
import { Value } from 'react-native-reanimated'
import HomeButton from './HomeButton'

type WorryData = {
	time: number | string
	title: string
	description?: string
}

interface slideProps {
	arr?: Array<any> | any
	imageArray?: Array<string> | any
	imProps?: any
	worryArray?: Array<WorryData>
}

export default function ScrollXGallery({ arr, imageArray, imProps, worryArray }: slideProps) {
	const { height, width } = useWindowDimensions()
	const scrollOffsetY = useRef(new Animated.Value(0)).current

	return (
		<ScrollView horizontal={true} nestedScrollEnabled showsHorizontalScrollIndicator={false}>
			<ScrollView
				disableScrollViewPanResponder
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{imageArray && (
					<HStack minW={'100%'} flex={1} alignItems={'stretch'} mx={0}>
						{imageArray.map((i: ImageSourcePropType, index: number) => (
							<Box key={index} p={100} mx={100}>
								<Image
									overflow={'visible'}
									boxSize={'200'}
									resizeMode={'cover'}
									alt='spatter'
									maxW={width / 3}
									source={i}
									key={index}
									{...imProps}
								/>
							</Box>
						))}
					</HStack>
				)}
			</ScrollView>
			<ScrollView>
				{worryArray && (
					<HStack minW={'100%'}>
						{worryArray.map((w: WorryData, index: number) => (
							<VStack key={index} zIndex={4} flex={1} py={10} px={4}>
								<Tag>{w.time}</Tag>
								<Text>{w.title}</Text>
								<Text>{w.description}</Text>
							</VStack>
						))}
					</HStack>
				)}
			</ScrollView>
		</ScrollView>
	)
}
