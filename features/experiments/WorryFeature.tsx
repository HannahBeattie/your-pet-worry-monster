import { HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

function WorryFeature() {
	const worryData = useSelector(selectAllInactive)
	const monsterName = useSelector(monsterNameSelector)
	const { width } = useWindowDimensions()
	return (
		<VStack variant={'page'}>
			<ScrollView horizontal={true} scrollEnabled flex={1}>
				<HStack flex={1} space={4} alignItems='center'>
					{worryData.map((worry) => (
						<DragExpander
							key={worry.id}
							_bg={{ bg: 'gray.700', borderRadius: 'lg' }}
							p={8}
							maxW={width * 0.7}
							header={
								<Text fontSize={'sm'} width='100%' fontWeight='700'>
									I worried that {worry.description}
								</Text>
							}
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
								<VStack alignItems='flex-end'>
									<Text
										fontSize={'xs'}
										fontStyle='italic'
										color='gray.200'
										fontWeight='200'
									>
										Worried {useFormatDate(worry.id)}
									</Text>
									{worry.consumedAt && (
										<Text
											fontSize={'xs'}
											fontStyle='italic'
											color='gray.200'
											fontWeight='200'
										>
											Eaten by {monsterName} {useFormatDate(worry.consumedAt)}
										</Text>
									)}
								</VStack>
							</VStack>
						</DragExpander>
					))}
				</HStack>
			</ScrollView>
		</VStack>
	)
}

export default WorryFeature
