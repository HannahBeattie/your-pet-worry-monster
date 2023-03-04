import { useRouter } from 'expo-router'
import { Center, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import { setIntroPlayed, setThirdPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Third() {
	const dispatch = useDispatch()
	const router = useRouter()
	const handlePress = () => {
		dispatch(setThirdPlayed(true))
		router.push('/name')
	}

	return (
		<VStack flex={1} p={4}>
			<TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
				<MonsterVoice>I can't be a fearsome worry monster without a name!</MonsterVoice>
				<FullBlue monsterMood='upset' />
			</TouchableOpacity>
		</VStack>
	)
}

export default Third
