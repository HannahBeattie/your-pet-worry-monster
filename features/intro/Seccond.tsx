import { Center } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import { setseccondPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Seccond() {
	const dispatch = useDispatch()
	const handleLast = () => {
		dispatch(setseccondPlayed(true))
	}
	const introText = [
		'I eat Worries',
		'They are deleicious!',
		'my name is...',
		'wait!',
		"I don't have a name!",
	]
	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<FullBlue monsterMood='sad' />
			</SequentialText>
		</Center>
	)
}

export default Seccond
