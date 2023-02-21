import { useRouter } from 'expo-router'
import { Button } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

function HomeButton() {
	const name = useSelector(monsterNameSelector)
	const router = useRouter()
	return (
		<Button
			onPress={() => {
				router.push('/monsterMenu')
			}}
		>
			Back To {name}
		</Button>
	)
}

export default HomeButton
