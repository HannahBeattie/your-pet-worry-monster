import { Button, Text, VStack } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllWorries, worriesSelectors } from '~features/worries/worrySlice'

export default function DangerousDelete() {
	const dispatch = useDispatch()
	let worryData = useSelector(worriesSelectors.selectAll)
	const wipeWorryData = () => {
		dispatch(deleteAllWorries())
	}

	return (
		<VStack>
			<Button
				colorScheme={'red'}
				size={'lg'}
				fontSize={'2xl'}
				onPress={() => {
					wipeWorryData()
				}}
			>
				Danger! Deleting all worry data!!
			</Button>
			{/* {worryData.map((worry, idx) => (
				<Text key={idx} color={'white'}>
					{JSON.stringify(worry, null, '    ')}
				</Text>
			))} */}
		</VStack>
	)
}
