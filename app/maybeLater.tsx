import { useRouter } from 'expo-router'
import { Center, Heading } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setIntroPlayed } from '~features/intro/introSlice'
import MonsterVoice from '~features/styledComponents/MonsterVoice'

function MaybeLater() {
	const dispatch = useDispatch()
	const router = useRouter()

	const handlePlayed = () => {}
	router.push('/')
	dispatch(setIntroPlayed(true))

	return (
		<Center flex={1} backgroundColor={'gray.900'}>
			<TouchableOpacity onPress={handlePlayed}>
				<MonsterVoice>maybe Later...</MonsterVoice>
			</TouchableOpacity>
		</Center>
	)
}

export default MaybeLater
