import { Center, Spacer, VStack } from 'native-base'
import React, { FC, useState, ReactElement } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, useWindowDimensions } from 'react-native'
import Modal from 'react-native-modal'

interface Props {
	fullWorry: ReactElement
	partialWorry: ReactElement
}

const ModalView: FC<Props> = ({ fullWorry, partialWorry }) => {
	const { height, width } = useWindowDimensions()
	const [visibleModal, setVisibleModal] = useState<number | null>(null)

	const renderButton = (text: string, onPress: () => void) => (
		<TouchableOpacity onPress={onPress}>
			{partialWorry}
			<View style={styles.button}>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	)

	const renderModalContent = () => (
		<Center
			flex={1}
			width={width}
			height={height}
			alignItems={'stretch'}
			backgroundColor={'gray.900'}
			p={0}
		>
			<VStack flex={1}>{fullWorry}</VStack>
			{renderButton('Close', () => setVisibleModal(null))}
		</Center>
	)

	return (
		<View style={styles.container}>
			{renderButton('Full Screen modal', () => setVisibleModal(1))}

			<Modal
				isVisible={visibleModal === 1}
				backdropColor={''}
				animationIn={'zoomInDown'}
				animationOut={'zoomOutUp'}
				animationInTiming={1000}
				animationOutTiming={1000}
				style={{ margin: 0 }}
			>
				{renderModalContent()}
			</Modal>
		</View>
	)
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

export default ModalView
