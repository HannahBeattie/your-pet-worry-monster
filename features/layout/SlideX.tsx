import { Box, Heading, HStack, Image, VStack, Text, Tag, Center } from 'native-base'
import React, { useRef } from 'react'
import { Animated, ImageSourcePropType, ScrollView, useWindowDimensions } from 'react-native'
import { Value } from 'react-native-reanimated'
import HomeButton from './HomeButton'
import JiggleDeleteView from 'react-native-jiggle-delete-view'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

export default function SlideX({ arr, imageArray, imProps, worryArray }: slideProps) {
	const { height, width } = useWindowDimensions()
	const [deleting, setDeleting] = React.useState(false)

	return (
		<>
			{imageArray && (
				<HStack minW={'100%'} flex={1} alignItems={'center'}>
					{imageArray.map((i: ImageSourcePropType, index: number) => (
						<Box key={index} p={100} mx={200}>
							<Image
								overflow={'visible'}
								boxSize={'450'}
								resizeMode={'cover'}
								alt='spatter'
								maxW={width / 4}
								source={i}
								zIndex={0}
								key={index}
							/>
						</Box>
					))}
				</HStack>
			)}
			{worryArray && (
				<HStack minW={'100%'} alignItems={'stretch'} justifyItems={'stretch'} space={8}>
					{worryArray.map((w: WorryData, index: number) => (
						<VStack p={8} key={index} flex={1} maxW={width}>
							<TouchableOpacity
								onLongPress={() => {
									setDeleting(!deleting)
								}}
							>
								<JiggleDeleteView
									deleting={deleting}
									onDelete={() => {
										console.log('todo: delete', index)
									}}
								>
									<Text>{w.time}</Text>
									<Text>{w.title}</Text>
									<Text>{w.description}</Text>
								</JiggleDeleteView>
							</TouchableOpacity>
						</VStack>
					))}
				</HStack>
			)}
		</>
	)
}
