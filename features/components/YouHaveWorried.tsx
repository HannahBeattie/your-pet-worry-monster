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
	let worryData = useSelector(worriesSelectors.selectAll)
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
					circleSize={10}
					circleColor='#9187e7'
					lineColor='#ff024a'
					renderFullLine
					timeContainerStyle={{}}
					eventContainerStyle={{
						paddingHorizontal: 8,
						paddingVertical: 40,
					}}
					titleStyle={{ color: 'white' }}
					timeStyle={{
						textAlign: 'center',
						backgroundColor: '#b381ffdf',
						color: 'white',
						padding: 10,
						fontWeight: '600',
						borderRadius: 13,
					}}
					descriptionStyle={{ color: 'white', marginTop: 10 }}
					options={{
						style: { paddingTop: 5 },
					}}
					isUsingFlatlist={true}
				/>
			</VStack>
		</VStack>
	)
}
