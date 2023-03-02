import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Center, Heading, HStack, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'
import FullBlue from './FullBlue'

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
		<PageWrapper>
			<MonsterVoice sizeVal={45} props={{ textAlign: 'start' }}>
				I...I...Love it!
			</MonsterVoice>
			<MonsterVoice sizeVal={30}>
				How did you get so GOOD at thinking up monster names?
			</MonsterVoice>

			<FullBlue monsterMood='excited' />

			<HStack space={4} justifyContent={'center'}>
				<TouchableOpacity
					onPress={() => {
						no()
					}}
				>
					<HStack space={2}>
						<Button outlineColor={'purple.500'} borderColor={'purple.500'}>
							<Text color={'purple.500'}>Oops!</Text>
						</Button>
					</HStack>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						yes()
					}}
				>
					<HStack space={2} alignItems={'flex-end'}>
						<Button backgroundColor={'purple.500'}>
							<Text color={'white'}>Yay!</Text>
						</Button>
					</HStack>
				</TouchableOpacity>
			</HStack>
		</PageWrapper>
	)
}
