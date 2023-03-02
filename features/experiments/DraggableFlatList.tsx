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
	Image,
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
	const router = useRouter()
	const spatter = require('../../assets/spatter01.png')
	const spatter2 = require('../../assets/spatter02.png')
	const spatter3 = require('../../assets/spatter03.png')
	const spatter4 = require('../../assets/spatter.png')
	const bagged = require('../../assets/bagged.jpg')

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
					backgroundColor={'black'}
					pb={4}
					borderRadius={'lg'}
					mb={4}
					px={2}
					pt={2}
					outlineColor={'black'}
					borderWidth={1}
					borderColor={'black'}
				>
					<Button
						flex={1}
						py={4}
						variant={'ghost'}
						borderTopRadius={'lg'}
						borderRadius={'md'}
						borderColor={'cyan.300'}
						borderWidth={1}
						backgroundColor={'blueGray.900'}
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
						<Text fontSize={'md'} fontWeight={'600'} color={'white'}>
							Feed to {name}
						</Text>
					</Button>

					<Container py={8}>
						<Text px={4} color={'white'} fontSize={'sm'}>
							{useFormatDate(item.id)}
						</Text>
						<Text px={4} color={'white'} fontSize={'md'}>
							{item.title}
						</Text>
					</Container>
				</VStack>
			</TouchableOpacity>
		</ScaleDecorator>
	)

	return (
		<VStack backgroundColor={'black'} flex={1}>
			<ImageBackground source={spatter2}>
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
						<VStack px={8} pb={100}>
							<Heading color={'white'} fontSize={'3xl'} textAlign={'center'} py={4}>
								Current Worries
							</Heading>
							<Text textAlign={'center'} pb={2} color={'white'}>
								drag to order
							</Text>

							<DraggableFlatList<FlatListItem>
								data={data}
								pagingEnabled
								scrollEnabled={false}
								showsHorizontalScrollIndicator={false}
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
