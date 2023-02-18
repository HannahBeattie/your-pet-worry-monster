import { Heading, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { worriesSelectors } from '~features/worries/worrySlice'

export default function YouHaveWorried() {
	let worryData = useSelector(worriesSelectors.selectAll)
	console.log('worryData', worryData)

	return (
		<VStack>
			<Heading fontSize={'xl'} color={'white'}>
				You Have Worried that :
			</Heading>
			{worryData.map((worry, idx) => (
				<Text
					key={`worry-${idx}`}
					color={'white'}
					fontFamily='mono'
					bg='gray.700'
					p='4'
					my='2'
				>
					{JSON.stringify(worry, null, '    ')}
				</Text>
			))}
		</VStack>
	)
}
