import { HStack, ScrollView, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import AccordionView from '~features/worries/AccordianView'
import { useFormatDate } from '~features/worries/useFormatDate'
import { deleteWorry, selectAllInactive } from '~features/worries/worrySlice'

export default function RenderAcc() {
	const worryData = useSelector(selectAllInactive)
	const monster = useSelector(monsterNameSelector)

	const { height, width } = useWindowDimensions()
	const [deleting, setDeleting] = React.useState(false)
	const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false)
	const dispatch = useDispatch()

	const handleDelete = (worry) => {
		console.log('deleting worry:', worry)
		dispatch(deleteWorry(worry.id))
	}
	const font = { fontFamily: 'Poppins_300Light', color: 'black', fontSize: 'md' }

	console.log('worryData:', worryData)

	const SECTIONS = worryData.map((worry) => {
		return {
			dateConsumed: useFormatDate(worry.consumedAt),
			worry: worry.description,
			more: 'Details',
			added: worry.extraNote,
			content: useFormatDate(worry.id),
			details: worry.sensation,
		}
	})

	return (
		<VStack p={4} flex={1} backgroundColor={'gray.900'}>
			<ScrollView horizontal={true}>
				<HStack px={4} space={4} py={100}>
					{SECTIONS.map((section) => (
						<AccordionView key={section.content} SECTIONS={[section]} />
					))}
				</HStack>
			</ScrollView>
		</VStack>
	)
}
