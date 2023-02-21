import { Box, Button, Heading, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ListAllWorries from '~features/worries/ListAllWorries'
import worrySlice, {
	selectAllActive,
	selectLastActive,
	updateWorry,
} from '~features/worries/worrySlice'
import { Hidden } from 'native-base'
import HomeButton from '~features/layout/HomeButton'

export default function Current() {
	const allActive = useSelector(selectAllActive).reverse()
	const dispatch = useDispatch()

	return (
		<VStack variant='page' space={8}>
			<Heading>Curent Worries</Heading>

			{allActive.map((worry) => (
				<VStack key={worry.id}>
					<Pressable>
						<Heading>Worry:</Heading>
						<Text>{worry.description}</Text>
						<Heading>The Scariest bit:</Heading>
						<Text>{worry.extraNote}</Text>
						<Button
							onPress={() => {
								dispatch(
									updateWorry({
										id: worry.id,
										changes: { isActive: !worry.isActive },
									})
								)
							}}
						>
							Say goodye to this worry!
						</Button>
					</Pressable>
				</VStack>
			))}
			<HomeButton />

			{/* <Text>All Active: {allActive.map((worry) => worry.description).join(', ')}</Text> */}
		</VStack>
	)
}
