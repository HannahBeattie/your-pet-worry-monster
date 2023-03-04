import { Center, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import { setseccondPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Seccond() {
	const dispatch = useDispatch()
	const handleLast = () => {
		dispatch(setseccondPlayed(true))
	}
	const introText = ['I eat Worries', 'They are deleicious!', 'my name is...', 'WAIT!']
	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<VStack flex={1} alignItems={'center'} justifyItems={'center'}>
					<MonsterVoice>I don't have a name!</MonsterVoice>
					<FullBlue monsterMood='sad' />
				</VStack>
			</SequentialText>
		</Center>
	)
}

export default Seccond
