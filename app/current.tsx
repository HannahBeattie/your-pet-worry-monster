import { useRouter } from 'expo-router'
import { Button, Heading, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import HomeButton from '~features/layout/HomeButton'
import Scroll from '~features/layout/Scroll'
import SimpleHome from '~features/layout/SimpleHome'
import Blue from '~features/monster/Blue'
import Gregory from '~features/monster/Gregory'
import { selectAllActive, updateWorry } from '~features/worries/worrySlice'

export default function Current() {
	const allActive = useSelector(selectAllActive).reverse()
	const dispatch = useDispatch()

	const router = useRouter()
	return (
		<Scroll>
			<VStack variant='page' flex={1} minH={'100%'} space={8}>
				<Spacer />
				<Heading>Curent Worries</Heading>
				{allActive.map((worry) => (
					<VStack key={worry.id}>
						<Pressable>
							<Heading>Worry:</Heading>
							<Text>{worry.description}</Text>
							<Heading>The Scariest bit:</Heading>
							<Text>{worry.extraNote}</Text>
							<Button
								onPress={() => {
									dispatch(
										updateWorry({
											id: worry.id,
											changes: { isActive: !worry.isActive },
										})
									),
										router.push('/eatingWorry')
								}}
							>
								Say goodye to this worry!
							</Button>
						</Pressable>
					</VStack>
				))}
				<Spacer />
				<SimpleHome />
			</VStack>
		</Scroll>
	)
}
