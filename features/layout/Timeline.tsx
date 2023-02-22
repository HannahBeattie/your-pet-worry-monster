import { Entypo, MaterialIcons } from '@expo/vector-icons'
import {
	Box,
	Center,
	Heading,
	HStack,
	Icon,
	Pressable,
	ScrollView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

import { useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'

export default function Timeline() {
	const [mode, setMode] = useState('Basic')
	return (
		<Center flex={1}>
			<Box bg={'teal.900'} flex='1' safeAreaTop maxW='400px' w='100%'>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Basic />
				</ScrollView>
			</Box>
		</Center>
	)
}

function Basic() {
	let worryData = useSelector(selectAllInactive).reverse()
	const data = worryData.map(function (value) {
		return {
			time: useFormatDate(value.id),
			title: value.description,
			description: value.extraNote,
		}
	})
	const [listData, setListData] = useState(data)

	const closeRow = (rowMap: any, rowKey: any) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow()
		}
	}

	const deleteRow = (rowMap: any, rowKey: any) => {
		closeRow(rowMap, rowKey)
		const newData = [...listData]
		const prevIndex = listData.findIndex((item: any) => item.key === rowKey)
		newData.splice(prevIndex, 1)
		setListData(newData)
	}

	const onRowDidOpen = (rowKey: any) => {
		console.log('This row opened', rowKey)
	}

	const renderItem = ({ item, index }: any) => (
		<VStack flex={1}>
			<Pressable onPress={() => console.log('You touched me')} bg={'coolGray.800'}>
				<Box pl='4' pr='5' py='2'>
					<HStack alignItems='center' space={3}>
						<VStack>
							<Text
								color='coolGray.800'
								_dark={{
									color: 'warmGray.50',
								}}
								bold
							>
								{item.title}
							</Text>
							<Text color='red.600'>{item.description}</Text>
						</VStack>

						<Text
							fontSize='xs'
							color='coolGray.800'
							_dark={{
								color: 'warmGray.50',
							}}
							alignSelf='flex-start'
						>
							{item.time}
						</Text>
					</HStack>
				</Box>
			</Pressable>
		</VStack>
	)
	const { height, width } = useWindowDimensions()

	const renderHiddenItem = (data: any, rowMap: any) => (
		<HStack flex={1} alignItems={'stretch'} maxW='360px'>
			<Spacer />
			<Pressable
				borderRadius={'md'}
				flex={1}
				bg='gray.900'
				alignItems={'stretch'}
				onPress={() => deleteRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}
			>
				<Center flex={1} pl={12}>
					<Icon as={<MaterialIcons name='delete' />} color='red.600' size='8' />
					<Text fontSize={'sm'} color='white'>
						Delete
					</Text>
				</Center>
			</Pressable>
		</HStack>
	)

	return (
		<VStack minH={height} flex={1} backgroundColor={'red.100'} minHeight={height}>
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-130}
				previewRowKey={'0'}
				previewOpenValue={-40}
				previewOpenDelay={3000}
				swipeRowStyle={{ margin: 8 }}
				onRowDidOpen={onRowDidOpen}
			/>
		</VStack>
	)
}
