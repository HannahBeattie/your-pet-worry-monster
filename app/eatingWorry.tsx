import { Box, Button, Fab, Heading, HStack, IconButton, Image, Text, VStack } from 'native-base'
import React from 'react'
import HomeButton from '~features/layout/HomeButton'
import MyFab from '~features/layout/MyFab'
import Blue from '~features/monster/Blue'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'

const gregoryBlue = require('../assets/blueFace.png')

export default function EatingWorry() {
	const router = useRouter()
	return (
		<VStack variant={'page'} pt={100}>
			<Heading textAlign={'center'}>YUMMMM!</Heading>
			<Heading textAlign={'center'}>That Was delicious!</Heading>
			<Blue />

			<HStack
				space={8}
				justifyItems={'center'}
				flexDirection={'row'}
				alignContent={'center'}
				justifyContent={'center'}
			>
				<VStack
					textAlign={'center'}
					justifyContent={'center'}
					alignItems={'center'}
					space={2}
				>
					<Pressable
						onPress={() => {
							router.push('/monsterMenu')
						}}
					>
						<MaterialCommunityIcons name='home-outline' size={40} color='white' />
					</Pressable>
					<Text>Home</Text>
				</VStack>
				<VStack
					textAlign={'center'}
					justifyContent={'center'}
					alignItems={'center'}
					space={2}
				>
					<Pressable
						onPress={() => {
							router.push('/addWorry')
						}}
					>
						<Ionicons name='md-add-circle' size={40} color='white' />
					</Pressable>
					<Text>Add More</Text>
				</VStack>
			</HStack>
		</VStack>
	)
}
