import { Box, Heading, Input, Text, VStack } from 'native-base'
import React from 'react'
import { Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import InputName from '~features/components/InputName'
import { monsterNameSelector, setName } from '~features/monster/monsterSlice'

type Worry = {
	timestamp: number
	some: string
	other: string
}

export default function Page() {
	const dispatch = useDispatch()
	const monsterName = useSelector(monsterNameSelector)

	const worry: Worry = {
		timestamp: +new Date(),
		some: 'Hello',
		other: 'Mr Worried',
	}

	return (
		<VStack
			backgroundColor={'coolGray.900'}
			flex={1}
			alignItems={'center'}
			py={100}
			px={8}
			color={'white'}
			space={4}
		>
			<InputName />
			{/* <Box alignItems='center'>
				<Input mx='3' placeholder='Name Goes Here' w='100%' />
			</Box>
			<Heading color={'white'}>My name is {monsterName}</Heading> */}
			{/* 
			<Button
				onPress={() => {
					console.log('Trying to set name...', setName('Gregory'))
					dispatch(setName('Gregory'))
				}}
				title='New name!'
			/> */}
			{/* <Text style={styles.title}>{worry.some}</Text>
			<Text style={styles.subtitle}>{worry.other}</Text> */}
		</VStack>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: 'center',
		maxWidth: 960,
		marginHorizontal: 'auto',
	},
	title: {
		fontSize: 64,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 36,
		color: '#38434D',
	},
})
