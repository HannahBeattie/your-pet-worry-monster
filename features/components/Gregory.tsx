import { Heading, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

function Gregory() {
	let name = useSelector(monsterNameSelector)
	return (
		<VStack alignItems={'stretch'} flex={'1'}>
			<Spacer />
			<Image
				alt={'blue the monster'}
				source={require('../../app/assets/blue.png')}
				height={400}
			/>
			<Text color={'blue.300'} textAlign={'center'} pt={4}>
				{name}
			</Text>
			<Spacer />
		</VStack>
	)
}

export default Gregory
