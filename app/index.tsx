import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>{monsterName}</Text>
				<Button
					onPress={() => {
						console.log('Trying to set name...', setName('Gregory'))
						dispatch(setName('Gregory'))
					}}
					title='New name!'
				/>
				<Text style={styles.title}>{worry.some}</Text>
				<Text style={styles.subtitle}>{worry.other}</Text>
			</View>
		</View>
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
