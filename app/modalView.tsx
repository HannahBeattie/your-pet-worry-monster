import { Text, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Collapsible from '~features/layout/Collapsable'

export default function modalView() {
	return (
		<View style={styles.container}>
			<Collapsible title='My Collapsible Component'>
				<Text color={'black'}>
					This content will be shown when the component is expanded
				</Text>
			</Collapsible>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 0,
	},
})
