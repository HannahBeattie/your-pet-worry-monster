import { Center, HStack, Tag, Text, VStack } from 'native-base'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWorry, selectAllInactive, Worry } from '~features/worries/worrySlice'
//@ts-expect-error
import JiggleDeleteView from 'react-native-jiggle-delete-view'
import { useFormatDate } from './useFormatDate'
import React from 'react'
import MyFab from '~features/layout/MyFab'

function DisplayWorry() {
	let worryData = useSelector(selectAllInactive).reverse()
	const { height, width } = useWindowDimensions()
	const [deleting, setDeleting] = React.useState(false)
	const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false)
	const dispatch = useDispatch()

	const handleDelete = (worry: Worry) => {
		console.log('deleting worry:', worry)
		dispatch(deleteWorry(worry.id))
	}

	return (
		<HStack>
			{worryData.map((worry) => (
				<VStack p={8} key={worry.id} flex={1} maxW={width} backgroundColor={'pink.300'}>
					<TouchableOpacity
						onLongPress={() => {
							setShowDeleteJiggle(!showDeleteJiggle)
						}}
					>
						<JiggleDeleteView
							showDeleteJiggle={showDeleteJiggle}
							onDelete={() => {
								console.log('set up deleteItem(index)', worry)
								setDeleting(!showDeleteJiggle)
								handleDelete(worry)
							}}
						>
							<Center backgroundColor={'red.100'}>
								<Tag>{worry.description}</Tag>
								<Text>{useFormatDate(worry.id)}</Text>
								<Text>{worry.extraNote}</Text>
							</Center>
						</JiggleDeleteView>
					</TouchableOpacity>
				</VStack>
			))}
			<MyFab />
		</HStack>
	)
}

export default DisplayWorry
