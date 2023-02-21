import { useRouter } from 'expo-router'
import { Box, Button, Center, Heading, Image } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

function HomeButton() {
	const name = useSelector(monsterNameSelector)
	const router = useRouter()
	const gregoryBlue = require('../../assets/blueFace.png')
	return (
		<Center position={'absolute'} bottom={10} right={'50%'} left={'50%'}>
			<Pressable
				onPress={() => {
					router.push('/monsterMenu')
				}}
			>
				<Image
					maxW={'70'}
					maxH={'70'}
					rounded={'200'}
					resizeMode='contain'
					alt={'blue the monster'}
					source={gregoryBlue}
					backgroundColor={'teal.900'}
				/>
			</Pressable>
		</Center>
	)
}

export default HomeButton
