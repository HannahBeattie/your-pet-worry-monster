import { useRouter } from 'expo-router'

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Heading,
	HStack,
	Icon,
	IconButton,
	Pressable,
	ScrollView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
	ImageBackground,
	LogBox,
	SafeAreaView,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native'
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
	const allActive: Worry[] = [...useSelector(selectAllActive)].reverse()
	const dispatch = useDispatch()
	const name = useSelector(monsterNameSelector)
	const { height } = useWindowDimensions()
	const spatter = require('../../assets/spatter01.png')
	const spatter2 = require('../../assets/spatter02.png')
	const spatter3 = require('../../assets/spatter03.png')

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
				<VStack
					space={2}
					backgroundColor={'#0000008f'}
					pb={4}
					borderRadius={'lg'}
					mb={4}
					px={2}
					pt={2}
				>
					<Button
						flex={1}
						py={4}
						variant={'ghost'}
						borderTopRadius={'lg'}
						borderRadius={'md'}
						backgroundColor={'#088797'}
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
						<Text fontSize={'md'} color={'white'}>
							Feed to {name}
						</Text>
					</Button>

					<Container py={4}>
						<Text px={4} {...font} color={'white'}>
							{useFormatDate(item.id)}
						</Text>
						<Text px={4} {...font} color={'white'}>
							{item.title}
						</Text>
					</Container>
				</VStack>
			</TouchableOpacity>
		</ScaleDecorator>
	)

	return (
		<VStack backgroundColor={'black'} flex={1}>
			<ImageBackground source={spatter}>
				<SafeAreaView>
					<Box px={2}>
						<Pressable
							onPress={() => {
								router.push('/monsterMenu')
							}}
						>
							<AntDesign name='back' size={24} color='white' />
						</Pressable>
					</Box>
					<ScrollView showsHorizontalScrollIndicator={false}>
						<VStack px={10} pb={100}>
							<Heading
								{...font}
								color={'white'}
								fontSize={'3xl'}
								textAlign={'center'}
								pt={4}
							>
								Current Worries
							</Heading>
							<Text
								{...font}
								fontSize={'md'}
								color={'white'}
								textAlign={'center'}
								pb={10}
							>
								Drag to re-order
							</Text>

							<DraggableFlatList<FlatListItem>
								data={data}
								pagingEnabled
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
								// onDragEnd={({ data }: DragEndParams<FlatListItem>) => setData(data)}
								keyExtractor={(item) => `${item.id}`}
								renderItem={renderItem}
							/>
						</VStack>
					</ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</VStack>
	)
}
