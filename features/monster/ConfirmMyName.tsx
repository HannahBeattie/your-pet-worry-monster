import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Center, Heading, HStack, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import NameLabel from '~features/styledComponents/NameLabel'
import PageWrapper from '~features/styledComponents/PageWrapper'
import FullBlue from './FullBlue'

export default function ConfirmMyName() {
	const name = useSelector(monsterNameSelector)
	const router = useRouter()
	const no = () => {
		router.push('/name')
	}
	const yes = () => {
		router.push('/monsterMenu')
	}
	return (
		<PageWrapper>
			<Center px={4}>
				<MonsterVoice props={{ textAlign: 'start' }}>{name}? I...I...Love it!</MonsterVoice>
			</Center>
			<FullBlue monsterMood='great' />

			<HStack space={4} justifyContent={'center'}>
				<CircleIconButton
					tag='no'
					arealabel={'no'}
					handlePress={() => {
						no()
					}}
					label={'oops!'}
					color={'gray.600'}
				/>
				<Spacer />
				<CircleIconButton
					tag='right'
					arealabel={'yes'}
					handlePress={() => {
						yes()
					}}
					label={'yay!'}
					color={'gray.400'}
				/>
			</HStack>
		</PageWrapper>
	)
}
