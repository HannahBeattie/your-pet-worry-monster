import { Heading, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import ListAllWorries from '~features/worries/ListAllWorries'
import { selectAllActive } from '~features/worries/worrySlice'

export default function Current() {
	const allActive = useSelector(selectAllActive)
	return (
		<VStack variant='page'>
			<VStack variant='center' my='8'>
				<Heading>Curent</Heading>
				<Text>All Active: {allActive.map((worry) => worry.description).join(', ')}</Text>
			</VStack>
			<ListAllWorries />
		</VStack>
	)
}
