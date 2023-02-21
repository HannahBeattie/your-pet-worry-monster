import { useRouter } from 'expo-router'
import { Box, Heading, HStack, Text, VStack } from 'native-base'
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
		<VStack variant={'page'}>
			<VStack backgroundColor={'violet.800'} p={4} borderRadius={'lg'}>
				<Text>I am worried that</Text>
				<Heading>{latestActive?.description}</Heading>
				<Text>The Scariest bit is</Text>
				<Heading>{latestActive?.extraNote}</Heading>
			</VStack>
			<Blue />
			<Text>Wouly you like me to hold on to this worry for a bit?</Text>
			<HStack space={4}>
				<Pressable
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
					<Text>No thank you, I am ready to say goodbye to this worry.</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						router.push('/current')
					}}
				>
					<Box backgroundColor={'red.900'} p={4}>
						<Text>Yes Please</Text>
					</Box>
				</Pressable>
			</HStack>
			{/* <Text>All Active: {allActive.map((worry: Worry) => worry.description).join(', ')}</Text> */}
		</VStack>
	)
}
