import {
	Box,
	Center,
	FlatList,
	Heading,
	Hidden,
	HStack,
	Image,
	ScrollView,
	Tag,
	Text,
	VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'
import { setTSpan } from 'react-native-svg/lib/typescript/lib/extract/extractText'

import { useSelector } from 'react-redux'
import { monsterNameSelector, monsterSliceName } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'
import HomeButton from './HomeButton'
import MyFab from './MyFab'

const spatter = require('../../assets/spatter01.png')
const blue = require('../../assets/eaten.png')
const spatter2 = require('../../assets/spatter02.png')
const spatter3 = require('../../assets/spatter03.png')
function Timeline() {
	const { height, width } = useWindowDimensions()
	let worryData = useSelector(selectAllInactive).reverse()
	let entries = worryData.map(function (value) {
		return {
			time: useFormatDate(value.id),
			title: value.description,
			description: value.extraNote,
		}
	})
	let dates = entries.forEach((e) => e.time)
	const name = useSelector(monsterNameSelector)

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			horizontal={true}
			backgroundColor={'gray.900'}
		>
			<VStack maxW={width} position={'absolute'} p={4} top={10} left={4} zIndex={4}>
				<Text px={0} fontSize={'xl'} color={'#ffffff91'}>
					{name}'s food diary
				</Text>
			</VStack>
			<HomeButton />

			<VStack>
				<HStack space={8}>
					<VStack maxH={width / 3}>
						<Image
							overflow={'visible'}
							p={4}
							boxSize={'600'}
							resizeMode={'contain'}
							alt='spatter'
							source={spatter2}
						/>
					</VStack>
					<VStack maxH={width / 2}>
						<Image
							overflow={'visible'}
							p={4}
							boxSize={'600'}
							resizeMode={'contain'}
							alt='spatter'
							source={spatter3}
						/>
					</VStack>

					<VStack maxH={width / 2}>
						<Image
							overflow={'visible'}
							p={4}
							boxSize={'600'}
							resizeMode={'contain'}
							alt='spatter'
							source={spatter2}
						/>
					</VStack>
				</HStack>

				<VStack>
					<FlatList
						px={4}
						scrollEnabled={false}
						pt={100}
						horizontal={true}
						disableScrollViewPanResponder
						data={entries}
						renderItem={({ item }) => (
							<VStack key={item.time} marginRight={4} space={0}>
								<Box p={4}>
									<Tag
										outlineColor={'white'}
										borderColor={'white'}
										backgroundColor={'#101010a2'}
										borderRadius={'lg'}
									>
										<Text fontSize={'sm'}>{item.time}</Text>
									</Tag>
								</Box>

								<VStack
									outlineColor={'white'}
									borderColor={'white'}
									borderWidth={1}
									pt={8}
									backgroundColor={'gray.900'}
									space={8}
									borderRadius={'lg'}
									alignContent={'center'}
									justifyContent={'center'}
									maxW={width / 1.5}
								>
									<Heading px={4} fontSize={'lg'} textAlign={'center'}>
										{item.title}
									</Heading>
									{item.description && (
										<VStack
											backgroundColor={'gray.900'}
											borderBottomRadius={'lg'}
										>
											<Text py={4} px={4} color={'white'} fontSize={'sm'}>
												{item.description}
											</Text>
										</VStack>
									)}
								</VStack>
							</VStack>
						)}
					/>

					<HStack space={8}>
						<VStack maxH={width / 2}>
							<Image
								overflow={'visible'}
								p={4}
								boxSize={'300'}
								resizeMode={'contain'}
								alt='spatter'
								source={spatter3}
							/>
						</VStack>

						<VStack maxH={width / 2}>
							<Image
								boxSize={'900'}
								resizeMode={'contain'}
								alt='spatter'
								source={blue}
							/>
						</VStack>
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	)
}

export default Timeline
