import { HStack, ScrollView, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlide from '~features/layout/ImageSlide'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { deleteWorry, selectAllInactive, Worry } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

const spatter = require('../../assets/spatter01.png')
const spatter2 = require('../../assets/spatter02.png')
const spatter3 = require('../../assets/spatter03.png')

function WorryFeature() {
	const imageArray = [spatter, spatter2, spatter3, spatter, spatter2, spatter3, spatter]
	const worryData = useSelector(selectAllInactive).reverse()
	const monsterName = useSelector(monsterNameSelector)
	const { width } = useWindowDimensions()
	const dispatch = useDispatch()
	return (
		<VStack flex={1}>
			<ScrollView horizontal={true} scrollEnabled flex={1}>
				<ImageSlide imageArray={imageArray} />
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
								console.log('deleting worry:', worry)
								dispatch(deleteWorry(worry.id))
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

					<ImageSlide imageArray={imageArray.reverse()} />
				</HStack>
			</ScrollView>
		</VStack>
	)
}

export default WorryFeature
