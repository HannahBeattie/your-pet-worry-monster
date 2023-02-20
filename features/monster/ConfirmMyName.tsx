import { useRouter } from 'expo-router'
import { Button, Heading, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

const gregoryBlue = require('../../assets/blue.png')

export default function ConfirmMyName() {
	const router = useRouter()
	const name = useSelector(monsterNameSelector)
	return (
		<VStack alignItems={'stretch'} flex={'1'}>
			<Heading pt={8}>Great! My Name is {name}!</Heading>
			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
			<Button
				bgColor={'red.500'}
				onPress={() => {
					router.push('/addName')
				}}
			>
				<Heading color={'black'}>No, wait! I changed my mind!</Heading>
			</Button>
			<Button
				bgColor={'blue.500'}
				onPress={() => {
					router.push('/monsterMenu')
				}}
			>
				<Heading color={'black'}>Pleased to meet you {name}!</Heading>
			</Button>
		</VStack>
	)
}
