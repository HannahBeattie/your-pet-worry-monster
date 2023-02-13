import { StyleSheet, Text, View } from 'react-native'

type Worry = {
	timestamp: number
	some: string
	other: string
}

export default function Page() {
	const worry: Worry = {
		timestamp: +new Date(),
		some: 'hi',
		other: 'hello',
	}
	return (
		<View style={styles.container}>
			<View style={styles.main}>
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
