import { Heading, HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive, Worry } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'
import { useWindowDimensions } from 'react-native'
import { monsterNameSelector } from '~features/monster/monsterSlice'

const longWorry: Worry = {
	id: +new Date(),
	description: `Descriptive stuff all goes here! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	extraNote: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	sensation: `labore et dolore magna aliqua. Ut enim ad minim`,
	consumedAt: +new Date() - 400000,
	isActive: false,
}

function WorryFeature() {
	const worryData = useSelector(selectAllInactive)
	const monsterName = useSelector(monsterNameSelector)
	const { width } = useWindowDimensions()
	const bg = '#444'
	return (
		<VStack variant={'page'}>
			<ScrollView horizontal={true} scrollEnabled>
				<HStack flex={1} space={4}>
					{worryData.map((worry) => (
						<DragExpander
							key={worry.id}
							_bg={{ bg: 'gray.700', borderRadius: 'lg' }}
							p={8}
							maxW={width * 0.7}
							expanded={
								<VStack space={4} pt={4} alignItems='stretch'>
									{worry.sensation && (
										<Text fontSize={'sm'}>I felt it in {worry.sensation}</Text>
									)}
									{worry.extraNote && (
										<Text fontSize={'sm'}>
											The scariest part was {worry.extraNote}
										</Text>
									)}
									<VStack alignItems='flex-end'>
										<Text fontSize={'xs'} fontStyle='italic'>
											Worried {useFormatDate(worry.id)}
										</Text>
										{worry.consumedAt && (
											<Text fontSize={'xs'} fontStyle='italic'>
												Eaten by {monsterName}{' '}
												{useFormatDate(worry.consumedAt)}
											</Text>
										)}
									</VStack>
								</VStack>
							}
						>
							<Text fontSize={'sm'} width='100%'>
								I worried that {worry.description}
							</Text>
						</DragExpander>
					))}
				</HStack>
			</ScrollView>
		</VStack>
	)
}

export default WorryFeature
