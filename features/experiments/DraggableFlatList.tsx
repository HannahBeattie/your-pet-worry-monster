import { useRouter } from 'expo-router'

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Button, Heading, HStack, Pressable, ScrollView, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { LogBox, SafeAreaView, TouchableOpacity } from 'react-native'
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllActive, updateWorry, Worry } from '~features/worries/worrySlice'

type FlatListItem = {
	id: number
	title: string
	note?: string
	isActive?: boolean
}

export const DraggableFlatlist = () => {
	const allActive: Worry[] = useSelector(selectAllActive).reverse()
	const dispatch = useDispatch()
	const name = useSelector(monsterNameSelector)

	const router = useRouter()
	const font = { fontFamily: 'Poppins_300Light', color: 'black', fontSize: 'sm' }

	const data: FlatListItem[] = allActive.map((worry) => ({
		id: worry.id,
		title: worry.description,
		note: worry.extraNote,
		isActive: worry.isActive,
	}))

	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
	}, [])

	const renderItem = ({ item, drag, isActive }: RenderItemParams<FlatListItem>) => (
		<ScaleDecorator>
			<TouchableOpacity onLongPress={drag} disabled={isActive}>
				<VStack space={2} backgroundColor={'gray.100'} pb={4} borderRadius={'lg'} mb={4}>
					<Button
						flex={1}
						px={6}
						py={4}
						backgroundColor={'gray.900'}
						borderTopRadius={'lg'}
						borderBottomRadius={0}
						onPress={() => {
							dispatch(
								updateWorry({
									id: item.id,
									changes: {
										isActive: !item.isActive,
										consumedAt: +new Date(),
									},
								})
							),
								router.push('/eatingWorry')
						}}
					>
						<HStack flex={1} alignItems={'stretch'}>
							<MaterialCommunityIcons name='food-drumstick' size={24} color='white' />

							<Text {...font} fontSize={'sm'} px={8} color='white'>
								Feed this worry to {name}
							</Text>
						</HStack>
					</Button>
					<Text px={8} {...font} color={'red.900'}>
						{useFormatDate(item.id)}
					</Text>
					<Text px={8} {...font}>
						{item.title}
					</Text>
				</VStack>
			</TouchableOpacity>
		</ScaleDecorator>
	)

	return (
		<VStack backgroundColor={'gray.300'}>
			<SafeAreaView>
				<Box px={2}>
					<Pressable
						onPress={() => {
							router.push('/monsterMenu')
						}}
					>
						<AntDesign name='back' size={24} color='black' />
					</Pressable>
				</Box>
				<ScrollView>
					<VStack px={10} py={2}>
						<Heading
							{...font}
							color={'black'}
							fontSize={'3xl'}
							textAlign={'center'}
							pt={4}
						>
							Current Worries
						</Heading>
						<Text {...font} fontSize={'md'} color={'black'} textAlign={'center'} pb={4}>
							Drag to re-order
						</Text>
						<DraggableFlatList<FlatListItem>
							data={data}
							pagingEnabled
							scrollEnabled={true}
							// onDragEnd={({ data }: DragEndParams<FlatListItem>) => setData(data)}
							keyExtractor={(item) => `${item.id}`}
							renderItem={renderItem}
						/>
					</VStack>
				</ScrollView>
			</SafeAreaView>
		</VStack>
	)
}
