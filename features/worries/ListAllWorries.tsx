import { Heading, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { worriesSelectors } from '~features/worries/worrySlice'

export default function ListAllWorries() {
	let worryData = useSelector(worriesSelectors.selectAll)
	console.log('worryData', worryData)

	return (
		<VStack flex={1} alignItems={'stretch'}>
			<Heading fontSize={'xl'} color={'white'} pb={8}>
				You Have Worried because:
			</Heading>
			{worryData.map((worry, idx) => (
				<VStack>
					<Text key={`worry-${idx}`} color={'white'}>
						{worry.description}
					</Text>
					<Text key={`worry-${idx}`} color={'gray.500'}>
						{worry.extraNote}
					</Text>
				</VStack>
			))}
		</VStack>
	)
}
