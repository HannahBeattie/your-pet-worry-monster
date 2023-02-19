import { Center, Heading, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { worriesSelectors } from '~features/worries/worrySlice'
import Timeline from 'react-native-timeline-flatlist'
import { formatRelative } from 'date-fns'

function toRelativeString(date: number) {
	return formatRelative(date, new Date())
}

export default function YouHaveWorried() {
	let worryData = useSelector(worriesSelectors.selectAll).reverse()
	console.log('worryData', worryData)

	let formatData = worryData.map(function (value) {
		return {
			time: toRelativeString(value.id),
			title: value.description,
			description: value.extraNote,
		}
	})

	return (
		<VStack flex={1} justifyItems={'stretch'} justifyContent={'space-evenly'} space={8}>
			<Heading fontSize={'xl'} textAlign={'center'} color={'white'}>
				You Have Worried because
			</Heading>
			<VStack flex={1}>
				<Timeline
					data={formatData}
					innerCircle={'dot'}
					circleSize={0}
					circleColor='#9187e7'
					renderFullLine
					timeContainerStyle={{}}
					eventContainerStyle={{
						paddingVertical: 30,
					}}
					titleStyle={{ color: 'white' }}
					timeStyle={{
						backgroundColor: '#b381ffdf',
						color: 'white',
						padding: 5,
						paddingVertical: 8,
						borderRadius: 10,
					}}
					descriptionStyle={{ color: 'white', marginTop: 10 }}
					columnFormat='single-column-left'
				/>
			</VStack>
		</VStack>
	)
}
