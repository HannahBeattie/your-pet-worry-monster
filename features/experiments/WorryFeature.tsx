import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Box,
	Heading,
	HStack,
	Icon,
	IconButton,
	ScrollView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlide from '~features/layout/ImageSlide'
import SimpleHome from '~features/layout/SimpleHome'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from '~features/worries/useFormatDate'
import { deleteWorry, selectAllInactive, Worry } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

const spatter = require('../../assets/spatter01.png')
const spatter2 = require('../../assets/spatter02.png')
const spatter3 = require('../../assets/spatter03.png')

function WorryFeature() {
	const imageArray = [spatter, spatter2, spatter3, spatter, spatter2, spatter3, spatter]
	const worryData = useSelector(selectAllInactive)
	const name = useSelector(monsterNameSelector)
	const { width } = useWindowDimensions()
	const dispatch = useDispatch()

	// re-render every minute so that the times stay updated
	const [rerender, setRerender] = useState(0)
	useEffect(() => {
		const timer = setInterval(() => {
			setRerender(+new Date())
		}, 60 * 1000)
		return () => clearInterval(timer)
	}, [])

	return (
		<VStack flex={1}>
			<SafeAreaView style={{ flex: 1 }}>
				<VStack px={2}>
					<SimpleHome />
				</VStack>
				<Heading
					fontSize={'md'}
					position={'absolute'}
					top={10}
					right={4}
					color={'gray.400'}
				>
					{name}'s Food Diary
				</Heading>
				<ScrollView
					horizontal={true}
					scrollEnabled
					flex={1}
					showsHorizontalScrollIndicator={false}
				>
					<ImageSlide imageArray={imageArray} />

					<HStack flex={1} space={4} alignItems='center' px={4} flexDir='row-reverse'>
						{worryData.map((worry) => (
							<DragExpander
								key={`${worry.id}`}
								p={10}
								px={8}
								maxW={width * 0.7}
								_bg={{ bg: 'gray.900', borderRadius: 'lg' }}
								borderWidth={1}
								borderColor={'gray.800'}
								borderRadius={'md'}
								header={
									<Text
										key={`desc-${worry.id}-${rerender}`}
										fontSize={'sm'}
										width='100%'
										fontWeight='700'
									>
										I worried {useFormatDate(worry.id)} {worry.description}
									</Text>
								}
								onDelete={() => {
									console.log('deleting worry:', worry)
									dispatch(deleteWorry(worry.id))
								}}
							>
								<VStack space={4} pt={4} alignItems='stretch'>
									{worry.sensation && (
										<Text fontSize={'sm'}>I felt it {worry.sensation}</Text>
									)}
									{worry.extraNote && (
										<Text fontSize={'sm'}>
											The scariest part was {worry.extraNote}
										</Text>
									)}
									{worry.consumedAt && (
										<Text
											key={`eaten-${worry.id}-${rerender}`}
											fontSize={'xs'}
											fontStyle='italic'
											color='gray.200'
											fontWeight='200'
											pt={1.5}
										>
											Eaten by {name} {useFormatDate(worry.consumedAt)}
										</Text>
									)}
								</VStack>
							</DragExpander>
						))}

						<ImageSlide imageArray={imageArray.reverse()} />
					</HStack>
				</ScrollView>
			</SafeAreaView>
		</VStack>
	)
}

export default WorryFeature
