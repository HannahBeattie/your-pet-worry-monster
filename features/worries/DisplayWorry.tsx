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

	console.log('worryData:', worryData)
	return (
		<HStack
			justifyItems={'center'}
			pt={'40'}
			direction={'row-reverse'}
			minH={height}
			justifyContent={'center'}
		>
			<Heading fontWeight={'200'} right={10} top={-30} position={'absolute'}>
				{monster}'s Food Diary
			</Heading>
			{worryData.map((worry) => (
				<VStack p={8} key={worry.id} flex={1} maxW={width}>
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
							<Tag
								borderTopWidth={1}
								borderColor={'gray.600'}
								backgroundColor={'gray.900'}
								borderTopRadius={'md'}
								alignSelf={'center'}
							>
								<Text color={'white'} fontWeight={'200'} fontSize={'md'} px={4}>
									Worry consumed {useFormatDate(worry!.consumedAt!)}
								</Text>
							</Tag>
							<Center
								borderWidth={1}
								borderColor={'gray.500'}
								backgroundColor={'#0000005d'}
								borderBottomRadius={'xl'}
								alignItems={'stretch'}
							>
								<VStack space={4} px={4} maxH={550} pb={8} pt={4}>
									<Tag
										color={'white'}
										borderRadius={'lg'}
										backgroundColor={'coolGray.800'}
									>
										<Text>{worry.description}</Text>
									</Tag>

									<VStack px={4} space={4} alignItems={'center'}>
										<Divider />

										<Text fontSize={'sm'}>The extra-scary flavor:</Text>

										<Text fontSize={'sm'} color={'white'} fontWeight={'light'}>
											{worry.extraNote}
										</Text>
										<Text color={'gray.200'}>{useFormatDate(worry.id)}</Text>
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
