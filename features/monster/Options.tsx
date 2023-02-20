import { useRouter } from 'expo-router'
import { Image, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomFab from '~features/layout/CustomFab'
import { monsterNameSelector } from '~features/monster/monsterSlice'

const gregoryBlue = require('../../assets/blue.png')

export default function Options() {
	const router = useRouter()
	const name = useSelector(monsterNameSelector)
	return (
		<VStack alignItems={'stretch'} justifyContent='center' flex={'1'}>
			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
			<Text color={'blue.300'} textAlign={'center'} pt={4}>
				{name}
			</Text>
			<CustomFab />
		</VStack>
	)
}
