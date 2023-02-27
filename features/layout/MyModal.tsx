import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Box, Button, Center, Divider, Heading, HStack, Spacer, VStack } from 'native-base'
import React, { FC, useState, ReactElement, ReactNode } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, useWindowDimensions } from 'react-native'
import Modal from 'react-native-modal'
import Warn from '~features/worries/Warn'
import { Worry } from '~features/worries/worrySlice'

interface Props {
	fullWorry?: FullWorry
	children?: ReactNode
	partialWorry?: PartialWorry
}

interface PartialWorry {
	consumedAt?: Date
	descripton?: string
}
interface FullWorry {
	partialWorry?: PartialWorry
	dateAdded?: Date
	ofNote?: String
	feelings?: String
}

const MyModal: FC<Props> = ({ fullWorry, partialWorry, children }) => {
	const { height, width } = useWindowDimensions()
	const [visibleModal, setVisibleModal] = useState<number | null>(null)

	const handleDelete = (worry: Worry) => {
		console.log('deleting worry:')
		// dispatch(deleteWorry(worry.id))
	}

	const renderButton = (text: string, onPress: () => void) => (
		<VStack px={4} mx={8}>
			<VStack space={10} backgroundColor={'gray.200'}>
				<VStack px={4}>
					<Heading color={'black'}>Partial</Heading>
				</VStack>
				{!!visibleModal && (
					<>
						<Warn />

						{/* </Warn><VStack flex={1}>
							<TouchableOpacity onPress={handleDelete} accessibilityLabel='Delete'>
								<Button
									backgroundColor='gray.800'
									py={4}
									px={4}
									borderRadius={200}
									_pressed={{ backgroundColor: 'red.800' }}
								>
									<AntDesign name='delete' size={24} color='white' />
								</Button>
							</TouchableOpacity>
						</VStack> */}
					</>
				)}

				<Spacer />
				<VStack my={'4'} alignItems={'center'} justifyContent={'center'}>
					<HStack>
						{!visibleModal && (
							<TouchableOpacity onPress={onPress} accessibilityLabel='Expand'>
								<MaterialIcons name='expand-more' size={24} color='black' />
							</TouchableOpacity>
						)}

						{!!visibleModal && (
							<HStack w={width} px={10}>
								<Spacer />
								<TouchableOpacity onPress={onPress} accessibilityLabel='Close'>
									<Spacer />
									<AntDesign name='closecircleo' size={24} color='black' />
								</TouchableOpacity>
							</HStack>
						)}
					</HStack>
				</VStack>
			</VStack>
		</VStack>
	)

	const renderModalContent = () => (
		<VStack
			flex={1}
			backgroundColor={'warmGray.200'}
			p={0}
			m={0}
			borderRadius={8}
			style={{ marginLeft: visibleModal ? 0 : undefined }}
			size={'full'}
			px={0}
		>
			<VStack flex={1} pt={20} px={8}>
				<Heading color={'black'}>Details</Heading>
			</VStack>
			{renderButton('Close', () => setVisibleModal(null))}
		</VStack>
	)

	return (
		<View style={styles.container}>
			{renderButton('Full Screen modal', () => setVisibleModal(1))}

			<Modal
				isVisible={visibleModal === 1}
				animationIn={'zoomInDown'}
				animationOut={'zoomOutUp'}
				animationInTiming={1000}
				animationOutTiming={1000}
				style={{ marginHorizontal: 0, marginVertical: 0 }}
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
		px: 0,
		mx: 0,
		backgroundColor: '#151515',
	},
})

export default MyModal
