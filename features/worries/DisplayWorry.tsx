import { Center, Divider, Heading, HStack, Tag, Text, VStack } from 'native-base'
import { Pressable, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWorry, selectAllInactive, Worry } from '~features/worries/worrySlice'
import React from 'react'
//@ts-expect-error
import JiggleDeleteView from 'react-native-jiggle-delete-view'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useFormatDate } from './useFormatDate'
import { AntDesign } from '@expo/vector-icons'
import SimpleHome from '~features/layout/SimpleHome'

function DisplayWorry() {
	let worryData = useSelector(selectAllInactive)
	const monster = useSelector(monsterNameSelector)

	const { height, width } = useWindowDimensions()
	const [deleting, setDeleting] = React.useState(false)
	const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false)
	const dispatch = useDispatch()

	const handleDelete = (worry: Worry) => {
		console.log('deleting worry:', worry)
		dispatch(deleteWorry(worry.id))
	}
	const font = { fontFamily: 'Poppins_300Light', color: 'black', fontSize: 'md' }

	console.log('worryData:', worryData)
	return (
		<HStack
			justifyItems={'center'}
			pt={'40'}
			direction={'row-reverse'}
			minH={height}
			justifyContent={'center'}
			position={'absolute'}
		>
			{worryData.map((worry) => (
				<VStack key={worry.id} px={4} maxW={width}>
					<TouchableOpacity
						onLongPress={() => {
							setShowDeleteJiggle(!showDeleteJiggle)
						}}
					>
						<JiggleDeleteView
							showDeleteJiggle={showDeleteJiggle}
							onDelete={() => {
								setDeleting(!showDeleteJiggle)
								handleDelete(worry)
							}}
						>
							<Center
								borderWidth={1}
								backgroundColor={'#ffffffe6'}
								alignItems={'stretch'}
								p={4}
								pb={8}
								borderRadius={'sm'}
							>
								<VStack space={4} alignItems={'center'} pb={4}>
									<Text
										fontWeight={'200'}
										px={4}
										fontFamily={'Poppins_500Medium'}
										color={'black'}
										fontSize={'md'}
									>
										Worry consumed {useFormatDate(worry!.consumedAt!)}
									</Text>
								</VStack>

								<VStack space={4} maxH={550}>
									<Divider />
									<Text {...font} fontFamily={'Poppins_500Medium'}>
										{worry.description}
									</Text>
									<Divider />
									<VStack space={0} alignItems={'center'}>
										<Text
											textTransform={'capitalize'}
											{...font}
											fontSize={'sm'}
										>
											First worried {useFormatDate(worry.id)}
										</Text>
										{worry.extraNote && (
											<>
												<Text
													{...font}
													color={'black'}
													fontFamily={'Poppins_500Medium'}
												>
													The extra-scary flavor:
												</Text>

												<Text
													fontWeight={'light'}
													{...font}
													fontSize={'sm'}
													fontFamily={'Poppins_500Medium'}
												>
													{worry.extraNote}
												</Text>
											</>
										)}
									</VStack>
								</VStack>
							</Center>
						</JiggleDeleteView>
					</TouchableOpacity>
				</VStack>
			))}
		</HStack>
	)
}

export default DisplayWorry
