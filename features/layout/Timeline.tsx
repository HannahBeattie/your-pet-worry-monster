import {
	Box,
	FlatList,
	Heading,
	HStack,
	Image,
	ScrollView,
	SectionList,
	SimpleGrid,
	Tag,
	Text,
	View,
	VStack,
} from 'native-base'
import React from 'react'
import { ImageBackground, useWindowDimensions } from 'react-native'

import { useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'

const spatter = require('../../assets/spatter01.png')
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

	return (
		<ScrollView horizontal={true} backgroundColor={'gray.900'}>
			<VStack>
				<HStack space={8}>
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
					<Heading px={8}>Blue's food diary</Heading>
					<FlatList
						px={4}
						maxWidth={'container'}
						showsHorizontalScrollIndicator={false}
						pt={100}
						horizontal={true}
						data={entries}
						renderItem={({ item }) => (
							<VStack key={item.time} marginRight={4} space={0}>
								<Box>
									<Tag>{item.time}</Tag>
								</Box>
								<VStack py={4} backgroundColor={'blue.900'} space={2}>
									<Tag backgroundColor={'red.200'}>{item.title}</Tag>
									<Tag>{item.description}</Tag>
								</VStack>
							</VStack>
						)}
					/>

					<HStack space={8}>
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
				</VStack>
			</VStack>
		</ScrollView>
	)
}

export default Timeline
