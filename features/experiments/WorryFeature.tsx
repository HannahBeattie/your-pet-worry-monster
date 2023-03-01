import { HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

const longWorry = {
	id: +new Date(),
	description: `Descriptive stuff all goes here! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	extraNote: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	sensation: `labore et dolore magna aliqua. Ut enim ad minim`,
	consumedAt: +new Date() - 400000,
	isActive: false,
}

function WorryFeature() {
	const worryData = useSelector(selectAllInactive).reverse()
	const monsterName = useSelector(monsterNameSelector)
	const { width } = useWindowDimensions()
	return (
		<VStack flex={1}>
			<ScrollView horizontal={true} scrollEnabled flex={1}>
				<HStack flex={1} space={4} alignItems='center'>
					{worryData.map((worry) => (
						<DragExpander
							key={worry.id}
							p={10}
							px={8}
							maxW={width * 0.7}
							_bg={{ bg: 'gray.700', borderRadius: 'lg' }}
							header={
								<Text fontSize={'sm'} width='100%' fontWeight='700'>
									I worried {useFormatDate(worry.id)} that {worry.description}
								</Text>
							}
							onDelete={() => {
								console.log(
									`TODO: Delete worry "${worry.description.slice(
										0,
										12
									)}...", or maybe AlertDialog?`
								)
							}}
						>
							<VStack space={4} pt={4} alignItems='stretch'>
								{worry.sensation && (
									<Text fontSize={'sm'}>I felt it in {worry.sensation}</Text>
								)}
								{worry.extraNote && (
									<Text fontSize={'sm'}>
										The scariest part was {worry.extraNote}
									</Text>
								)}
								{worry.consumedAt && (
									<Text
										fontSize={'xs'}
										fontStyle='italic'
										color='gray.200'
										fontWeight='200'
										pt={1.5}
									>
										Eaten by {monsterName} {useFormatDate(worry.consumedAt)}
									</Text>
								)}
							</VStack>
						</DragExpander>
					))}
				</HStack>
			</ScrollView>
		</VStack>
	)
}

export default WorryFeature
