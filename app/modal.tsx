import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

export default class Example extends Component {
	state = {
		visibleModal: null,
	}

	_renderButton = (text, onPress) => (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	)

	_renderModalContent = () => (
		<View style={styles.modalContent}>
			<Text>You Clicked On Modal !</Text>
			{this._renderButton('Close', () => this.setState({ visibleModal: null }))}
		</View>
	)

	render() {
		return (
			<View style={styles.container}>
				{this._renderButton('Full Screen modal', () => this.setState({ visibleModal: 1 }))}

				<Modal
					isVisible={this.state.visibleModal === 1}
					backdropColor={'lightgreen'}
					animationIn={'zoomInDown'}
					animationOut={'zoomOutUp'}
					animationInTiming={1000}
					animationOutTiming={1000}
				>
					{this._renderModalContent()}
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: 'lightblue',
		padding: 12,
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
})
