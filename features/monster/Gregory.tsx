import { Heading, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import FloatingButton from '~features/layout/MyFab'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import Blue from './Blue'

const gregoryBlue = require('../../assets/blue.png')

function Gregory() {
	const name = useSelector(monsterNameSelector)
	return (
		<VStack alignItems={'stretch'} flex={'1'}>
			<Heading color={'blue.300'} textAlign={'center'} pt={8}>
				{name}
			</Heading>
			<Blue />
			<FloatingButton />
		</VStack>
	)
}

export default Gregory
