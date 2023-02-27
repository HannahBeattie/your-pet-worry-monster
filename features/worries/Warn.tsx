import { AntDesign } from '@expo/vector-icons'
import {
	Center,
	VStack,
	HStack,
	IconButton,
	CloseIcon,
	Box,
	Text,
	Alert,
	Button,
	Collapse,
	Heading,
	Spacer,
	AlertDialog,
	Icon,
} from 'native-base'
import React, { Children } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'

export default function Warn({ children }: any) {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const cancelRef = React.useRef(null)
	const { height, width } = useWindowDimensions()
	return (
		<Center zIndex={4}>
			<IconButton
				icon={<Icon color={'white'} as={AntDesign} name={'delete'} />}
				name={'delete'}
				borderRadius='full'
				bg='gray.900'
				size={'lg'}
				onPress={() => setIsOpen(!isOpen)}
			/>
			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				color={'black'}
				onClose={onClose}
				zIndex={3}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Delete Worry</AlertDialog.Header>
					<AlertDialog.Body>Are you sure? This cannot be undone.</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button.Group space={2}>
							<Button
								variant='unstyled'
								colorScheme='coolGray'
								onPress={onClose}
								ref={cancelRef}
							>
								Cancel
							</Button>
							<Button colorScheme='danger' onPress={onClose}>
								Delete
							</Button>
						</Button.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</Center>
	)
}

/* <AntDesign name='delete' size={24} color='white' /> */
