import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

function SimpleHome() {
	const router = useRouter()
	return (
		<Pressable
			accessibilityLabel='home button'
			onPress={() => {
				router.push('/monsterMenu')
			}}
		>
			<AntDesign name='back' size={24} color='white' />
		</Pressable>
	)
}

export default SimpleHome
