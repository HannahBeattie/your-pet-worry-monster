import { useRouter } from 'expo-router'
import { Box, Button, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Blue from '~features/monster/Blue'
import {
	selectAllActive,
	selectLastActiveItem,
	updateWorry,
	Worry,
} from '~features/worries/worrySlice'

export default function SavingWorry() {
	const router = useRouter()
	const dispatch = useDispatch()
	const allActive: Array<Worry> = useSelector(selectAllActive)
	const latestActive = useSelector(selectLastActiveItem)
	console.log('latestActive is:', latestActive)

	return (
		<VStack variant={'page'} space={4}>
			<VStack pt={10} borderRadius={'lg'}>
				<Text>I am worried about {latestActive?.description}</Text>
				<Text>The Scariest bit is {latestActive?.extraNote}</Text>
			</VStack>
			<Blue />
			<Text>Wouly you like me to hold on to this worry for a bit?</Text>
			<Button
				bg={'gray.200'}
				onPress={() => {
					router.push('/')
				}}
			>
				<Text
					fontFamily='Poppins_300Light'
					py={2}
					textAlign={'center'}
					color={'black'}
					fontSize={'lg'}
					fontWeight={600}
				>
					Yes please.
				</Text>
			</Button>
			<Button
				bg={'gray.201'}
				onPress={() => {
					dispatch(
						updateWorry({
							id: latestActive.id,
							changes: { isActive: !latestActive.isActive, consumedAt: +new Date() },
						})
					),
						router.push('/eatingWorry')
				}}
			>
				<Text
					fontFamily='Poppins_300Light'
					py={2}
					textAlign={'center'}
					color={'black'}
					fontSize={'lg'}
					fontWeight={600}
				>
					No thank you, I am ready to say goodbye to this worry.
				</Text>
			</Button>

			{/* <Text>All Active: {allActive.map((worry: Worry) => worry.description).join(', ')}</Text> */}
		</VStack>
	)
}
