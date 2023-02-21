import { useRouter } from 'expo-router'
import { Box, Button, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Blue from '~features/monster/Blue'
import { selectAllActive, updateWorry, Worry } from '~features/worries/worrySlice'

export default function SavingWorry() {
	const router = useRouter()
	const dispatch = useDispatch()
	const allActive: Array<Worry> = useSelector(selectAllActive)
	const length = 0 < allActive.length - 1 ? allActive.length - 1 : 0
	const latestActive = allActive[length]
	return (
		<VStack variant={'page'} space={4}>
			<VStack pt={10} borderRadius={'lg'}>
				<Text>I am worried about {latestActive?.description}</Text>
				<Text>The Scariest bit is {latestActive?.extraNote}</Text>
			</VStack>
			<Blue />
			<Text>Wouly you like me to hold on to this worry for a bit?</Text>
			<Button
				onPress={() => {
					dispatch(
						updateWorry({
							id: latestActive.id,
							changes: { isActive: !latestActive.isActive },
						})
					),
						router.push('/eatingWorry')
				}}
			>
				No thank you, I am ready to say goodbye to this worry.
			</Button>

			<Button
				onPress={() => {
					router.push('/current')
				}}
			>
				Yes please.
			</Button>

			{/* <Text>All Active: {allActive.map((worry: Worry) => worry.description).join(', ')}</Text> */}
		</VStack>
	)
}
