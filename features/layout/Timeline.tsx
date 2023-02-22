import { FlatList, Heading, HStack, ScrollView, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'

import { useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'

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
		<ScrollView>
			<VStack variant={'page'} height={height}>
				<Heading>Blue's food diary</Heading>
				<FlatList
					py={100}
					horizontal={true}
					data={entries}
					renderItem={({ item }) => (
						<HStack>
							<Tag backgroundColor={'amber.200'}>{item.time}</Tag>
							<VStack py={2}>
								<Tag>{item.description}</Tag>
							</VStack>
						</HStack>
					)}
					keyExtractor={(item) => item.time}
				></FlatList>
			</VStack>
		</ScrollView>
	)
}

export default Timeline

// <ScrollView>
// 			<VStack variant={'page'} height={height}>
// 				<Heading>Blue's food diary</Heading>
// 				<FlatList
// 					py={100}
// 					horizontal={true}
// 					data={entries}
// 					renderItem={({ item }) => (
// 						<HStack>
// 							<Tag backgroundColor={'amber.200'}>{item.time}</Tag>
// 							<VStack py={2}>
// 								<Tag>{item.description}</Tag>
// 							</VStack>
// 						</HStack>
// 					)}
// 					keyExtractor={(item) => item.time}
// 				></FlatList>
// 			</VStack>
// 		</ScrollView>
