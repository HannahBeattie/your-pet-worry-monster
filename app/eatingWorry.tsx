import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Center, Heading, HStack, Icon, IconButton, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { selectAllActive } from '~features/worries/worrySlice'

export default function EatingWorry() {
	const router = useRouter()
	const active = useSelector(selectAllActive)
	return (
		<PageWrapper>
			<Center>
				<MonsterVoice sizeVal={'5xl'}> YUMMMM!</MonsterVoice>
				<MonsterVoice> That Was delicious!!</MonsterVoice>
				<MonsterVoice> Give me more!</MonsterVoice>
			</Center>
			<FullBlue monsterMood={'yummy'} />

			<HStack justifyContent={'space-evenly'}>
				{active.length > 0 && (
					<CircleIconButton
						handlePress={() => {
							router.push('current')
						}}
						tag='feed'
						arealabel='feed worry to monster'
						label='eat'
					/>
				)}
				<CircleIconButton
					arealabel='add worry'
					handlePress={() => {
						router.push('/addWorry')
					}}
					tag={'add'}
					label={'add'}
				/>
				<CircleIconButton
					arealabel='home'
					handlePress={() => {
						router.push('/')
					}}
					tag={'home'}
					label={'go'}
				/>
			</HStack>
		</PageWrapper>
	)
}
