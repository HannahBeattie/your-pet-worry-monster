import { Heading, HStack, ScrollView, Spacer, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import ExitPage from '~features/styledComponents/ExitPage'
import { useFormatDate } from '~features/worries/useFormatDate'
import { deleteWorry, selectAllInactive } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

const bg = require('../../assets/bg/tum.png')
const fg = require('../../assets/bg/fg.png')

function WorryFeature() {
	const worryData = useSelector(selectAllInactive)
	const name = useSelector(monsterNameSelector)
	const { width, height } = useWindowDimensions()
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
		<ImageBackground
			source={bg}
			style={{
				backgroundColor: '#151515',
				flex: 1,
				overflow: 'visible',
				minWidth: width,
				minHeight: height,
				alignContent: 'center',
			}}
			resizeMode={'repeat'}
		>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#000111c8' }}>
				<HStack>
					<Text p={2} px={4} opacity={40} color={'blue.300'}>
						{name}'s Food diary
					</Text>
					<Spacer />
					<ExitPage />
				</HStack>

				<ScrollView
					horizontal={true}
					scrollEnabled
					flex={1}
					showsHorizontalScrollIndicator={false}
				>
					<ImageBackground
						source={fg}
						style={{
							flex: 1,
						}}
						resizeMode={'contain'}
					>
						<VStack flex={1} justifyItems={'center'} justifyContent={'center'} pb={100}>
							<HStack
								flex={1}
								space={4}
								alignItems='center'
								px={4}
								flexDir='row-reverse'
							>
								{worryData.map((worry) => (
									<DragExpander
										key={`${worry.id}`}
										p={10}
										px={8}
										maxW={width * 0.7}
										_bg={{
											bg: 'gray.900',
											borderRadius: 'lg',
											borderColor: 'gray.800',
											borderWidth: 1,
										}}
										header={
											<Text
												key={`desc-${worry.id}-${rerender}`}
												fontSize={'sm'}
												width='100%'
												fontWeight='700'
											>
												I worried {useFormatDate(worry.id)}{' '}
												{worry.description}
											</Text>
										}
										onDelete={() => {
											console.log('deleting worry:', worry)
											dispatch(deleteWorry(worry.id))
										}}
									>
										<VStack space={4} pt={4} alignItems='stretch'>
											{worry.sensation && (
												<Text fontSize={'sm'}>
													I felt it {worry.sensation}
												</Text>
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
													Eaten by {name}{' '}
													{useFormatDate(worry.consumedAt)}
												</Text>
											)}
										</VStack>
									</DragExpander>
								))}
							</HStack>
						</VStack>
					</ImageBackground>
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	)
}

export default WorryFeature
