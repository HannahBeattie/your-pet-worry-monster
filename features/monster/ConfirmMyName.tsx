import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Center, Heading, HStack, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

const chef = require('../../assets/blue.png')

export default function ConfirmMyName() {
	const router = useRouter()
	const no = () => {
		router.push('/name')
	}
	const yes = () => {
		router.push('/monsterMenu')
	}
	const name = useSelector(monsterNameSelector)
	return (
		<VStack variant={'intro'} px={0} py={10}>
			<VStack>
				<Heading>I...I...I LOVE it!</Heading>
				<Heading>How did you get so GOOD at thinking up names?</Heading>
				<Heading>I am...{name}!</Heading>
			</VStack>

			<Image alt={'blue the monster'} source={chef} flex={1} resizeMode='contain' />

			<HStack>
				<TouchableOpacity
					onPress={() => {
						no()
					}}
				>
					<HStack space={2}>
						<Button backgroundColor={'gray.900'}>
							<Text color={'white'}>Oops!</Text>
						</Button>
					</HStack>
				</TouchableOpacity>
				<Spacer />
				<TouchableOpacity
					onPress={() => {
						yes()
					}}
				>
					<HStack space={2} alignItems={'flex-end'}>
						<Button backgroundColor={'gray.100'}>
							<Text color={'black'}>Yay!</Text>
						</Button>
					</HStack>
				</TouchableOpacity>
			</HStack>
		</VStack>
	)
}
