import { Heading, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateWorry, worriesSelectors } from '~features/worries/worrySlice'

export default function ListAllWorries() {
	const dispatch = useDispatch()
	const worryData = useSelector(worriesSelectors.selectAll)
	console.log('worryData', worryData)

	return (
		<VStack flex={1} alignItems={'stretch'}>
			<Heading fontSize={'xl'} color={'white'} pb={8}>
				You Have Worried because:
			</Heading>
			{worryData.map((worry, idx) => (
				<TouchableOpacity
					key={`worry-${idx}`}
					onPress={() => {
						dispatch(
							updateWorry({
								id: worry.id,
								changes: { isActive: !worry.isActive },
							})
						)
					}}
				>
					<VStack p='4' bg='gray.700' my='2'>
						<Text color={'white'}>{worry.description}</Text>
						<Text color={'gray.500'}>{worry.extraNote}</Text>
						<Text color={'white'}>{worry.isActive ? 'Active' : 'Inactive'}</Text>
					</VStack>
				</TouchableOpacity>
			))}
		</VStack>
	)
}
