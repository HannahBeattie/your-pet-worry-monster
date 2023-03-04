import { useRouter } from 'expo-router'
import { Center, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { setFirstPlayed } from './introSlice'
import SequentialText from './SequentialText'

function First() {
	const dispatch = useDispatch()
	const handleLast = () => {
		dispatch(setFirstPlayed(true))
	}

	const introText = ['Grrrrr!', 'ROOOWWWLL!', 'Roaarrr!', 'I am...', 'the DREADED...']

	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<MonsterVoice>Worry Monster!</MonsterVoice>
				<FullBlue monsterMood='sleepyHappy' />
			</SequentialText>
		</Center>
	)
}

export default First
