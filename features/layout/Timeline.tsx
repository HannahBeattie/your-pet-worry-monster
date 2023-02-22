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
	const { height, width } = useWindowDimensions()
	const [mode, setMode] = useState('Basic')
	return (
		<Center h='290px'>
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
		<Box>
			<Pressable
				onPress={() => console.log('You touched me')}
				_dark={{
					bg: 'coolGray.800',
				}}
				_light={{
					bg: 'white',
				}}
			>
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
						<Spacer />
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
		</Box>
	)

	const renderHiddenItem = (data: any, rowMap: any) => (
		<HStack flex='1' pl='2'>
			<Pressable
				w='70'
				ml='auto'
				bg='coolGray.200'
				justifyContent='center'
				onPress={() => closeRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}
			>
				<VStack alignItems='center' space={2}>
					<Icon
						as={<Entypo name='dots-three-horizontal' />}
						size='xs'
						color='coolGray.800'
					/>
					<Text fontSize='xs' fontWeight='medium' color='coolGray.800'>
						More
					</Text>
				</VStack>
			</Pressable>
			<Pressable
				w='70'
				bg='red.500'
				justifyContent='center'
				onPress={() => deleteRow(rowMap, data.item.key)}
				_pressed={{
					opacity: 0.5,
				}}
			>
				<VStack alignItems='center' space={2}>
					<Icon as={<MaterialIcons name='delete' />} color='white' size='xs' />
					<Text color='white' fontSize='xs' fontWeight='medium'>
						Delete
					</Text>
				</VStack>
			</Pressable>
		</HStack>
	)

	return (
		<Box bg='white' safeArea flex='1'>
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-130}
				previewRowKey={'0'}
				previewOpenValue={-40}
				horizontal={true}
				previewOpenDelay={3000}
				onRowDidOpen={onRowDidOpen}
			/>
		</Box>
	)
}
