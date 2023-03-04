import { useRouter } from 'expo-router'
import { Center } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import { setIntroPlayed, setThirdPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Third() {
	const dispatch = useDispatch()
	const router = useRouter()
	const handleLast = () => {
		dispatch(setThirdPlayed(true))
		router.push('/name')
	}

	const introText = ["I can't be", 'a feasome', 'worry monster', 'without a name!']
	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<FullBlue monsterMood='upset' />
			</SequentialText>
		</Center>
	)
}

export default Third
