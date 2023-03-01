import {
	Center,
	Container,
	Heading,
	HStack,
	ScrollView,
	Text,
	useAccessibleColors,
	VStack,
} from 'native-base'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive, Worry } from '~features/worries/worrySlice'
import DragExpander from './DragExpander'

const longWorry: Worry = {
	id: +new Date(),
	description: `Descriptive stuff all goes here! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	extraNote: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	sensation: `labore et dolore magna aliqua. Ut enim ad minim`,
	consumedAt: +new Date() - 400000,
	isActive: false,
}

function WorryFeature() {
	// const worryData = useSelector(selectAllInactive)
	const worryData = [longWorry]
	const bg = '#444'
	return (
		<VStack variant={'page'}>
			{/* <ScrollView horizontal={true} scrollEnabled> */}
			<HStack flex={1} space={4}>
				{worryData.map((worry) => (
					<DragExpander
						key={worry.id}
						p={8}
						_animated={{
							backgroundColor: bg,
						}}
						initialHeight={240}
						expanded={
							<VStack space={4} pt={4}>
								{worry.extraNote && (
									<>
										<Heading backgroundColor={'yellow.300'}>
											FIRST WORRIED
										</Heading>
										<Text fontSize={'sm'} backgroundColor={'yellow.300'}>
											First worried {useFormatDate(worry.id!)}
										</Text>
									</>
								)}
								{worry.sensation && <Text fontSize={'sm'}>{worry.sensation}</Text>}
								{worry.extraNote && <Text fontSize={'sm'}>{worry.extraNote}</Text>}
							</VStack>
						}
					>
						<Text fontSize={'sm'} width='100%'>
							{worry.description}
						</Text>
					</DragExpander>
				))}
			</HStack>
			{/* </ScrollView> */}
		</VStack>
	)
}

export default WorryFeature
