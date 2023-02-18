import { Heading, Text, VStack } from 'native-base'
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
		<>
			<Heading fontSize={'xl'} pb={8} textAlign={'center'} color={'red'}>
				You Have Worried because
			</Heading>
			<VStack flex={1} alignItems={'stretch'} p={4} color={'white'}>
				<Timeline
					flex={1}
					data={formatData}
					innerCircle={'dot'}
					circleSize={10}
					circleColor='#ff0000'
					lineColor='#ff0000'
					renderFullLine
					timeContainerStyle={{}}
					titleStyle={{ color: 'red' }}
					timeStyle={{
						textAlign: 'center',
						backgroundColor: '#ff0000',
						color: 'white',
						padding: 10,
						fontWeight: '600',
						borderRadius: 13,
					}}
					descriptionStyle={{ color: 'pink', marginTop: 2 }}
					options={{
						style: { paddingTop: 5 },
					}}
					isUsingFlatlist={true}
				/>
			</VStack>
		</>
	)
}
