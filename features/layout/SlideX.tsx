import { Box, Center, HStack, Image, Text, VStack } from 'native-base'
import React from 'react'
import { ImageSourcePropType, useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import JiggleDeleteView from 'react-native-jiggle-delete-view'
import { useDispatch } from 'react-redux'
import { deleteWorry, worriesSelectors } from '~features/worries/worrySlice'
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

export default function SlideX({ arr, imageArray, imProps, worryArray }: slideProps) {
	const { height, width } = useWindowDimensions()
	const [deleting, setDeleting] = React.useState(false)
	const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false)
	const dispatch = useDispatch()

	const handleDelete = (w) => {
		console.log('deleting worry:', w)
		dispatch(deleteWorry(w))
	}

	return (
		<>
			<HomeButton />
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
									setShowDeleteJiggle(!showDeleteJiggle)
								}}
							>
								<JiggleDeleteView
									showDeleteJiggle={showDeleteJiggle}
									onDelete={() => {
										setDeleting(!showDeleteJiggle)
										console.log('set up deleteItem(index)')
										handleDelete(w)
									}}
								>
									<Center backgroundColor={'gray.900'}>
										<Text>{w.time}</Text>
										<Text>{w.title}</Text>
										<Text>{w.description}</Text>
									</Center>
								</JiggleDeleteView>
							</TouchableOpacity>
						</VStack>
					))}
				</HStack>
			)}
		</>
	)
}
