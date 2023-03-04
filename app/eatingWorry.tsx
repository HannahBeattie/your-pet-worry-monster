import { useRouter } from 'expo-router'
import { Center, HStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import ExitPage from '~features/styledComponents/ExitPage'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { selectAllActive } from '~features/worries/worrySlice'

export default function EatingWorry() {
	const router = useRouter()
	const active = useSelector(selectAllActive)
	return (
		<PageWrapper>
			<ExitPage />
			<Center>
				<MonsterVoice sizeVal={'5xl'}> YUMMMM!</MonsterVoice>
				<MonsterVoice> That Was delicious!!</MonsterVoice>
				<MonsterVoice> Give me more!</MonsterVoice>
			</Center>
			<FullBlue monsterMood={'yummy'} />

			<HStack justifyContent={'space-evenly'}>
				{active.length > 0 && (
					<CircleIconButton
						color='#ffffff91'
						size={'2xl'}
						handlePress={() => {
							router.push('current')
						}}
						tag='knifeFork'
						arealabel='feed worry to monster'
						label='eat worry'
					/>
				)}
				<CircleIconButton
					color='#ffffff91'
					arealabel='add worry'
					handlePress={() => {
						router.push('/addWorry')
					}}
					size={'2xl'}
					tag={'add'}
					label={'add worry'}
				/>
			</HStack>
		</PageWrapper>
	)
}
