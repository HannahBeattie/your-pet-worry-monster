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
} from 'native-base'
import React, { Children } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'

export default function Warn({ children }: any) {
	const [show, setShow] = React.useState(false)
	const { height, width } = useWindowDimensions()
	return (
		<VStack w='100%' alignItems='center'>
			<Collapse
				isOpen={show}
				width={width}
				justifyContent={'center'}
				justifyItems={'center'}
				alignContent={'center'}
				alignSelf={'center'}
				marginTop={3}
			>
				<Alert status='error' py={2} my={2}>
					<VStack space={1} flexShrink={1} w='100%'>
						<HStack
							flexShrink={1}
							space={2}
							alignItems='center'
							justifyContent='space-between'
						>
							<HStack flexShrink={1} space={2} alignItems='center'>
								<Alert.Icon />
								<Text
									fontSize='md'
									fontWeight='medium'
									_dark={{
										color: 'coolGray.800',
									}}
								>
									Are you sure?
								</Text>
							</HStack>

							<IconButton
								variant='unstyled'
								_focus={{
									borderWidth: 0,
								}}
								icon={<CloseIcon size='3' />}
								_icon={{
									color: 'coolGray.600',
								}}
								onPress={() => setShow(false)}
							/>
						</HStack>
						<Center>
							<HStack space={1}>
								<Button variant={'ghost'} backgroundColor={'red.800'}>
									<Heading color={'red.100'}>Yip!</Heading>
								</Button>
								<Button variant={'ghost'} backgroundColor={'gray.800'}>
									<Heading color={'white'}>Oops!</Heading>
								</Button>
							</HStack>
						</Center>
					</VStack>
				</Alert>
			</Collapse>

			<HStack mr={-4}>
				<Spacer />
				<Button
					py={3}
					px={3}
					borderRadius={200}
					_pressed={{ backgroundColor: 'red.800' }}
					onPress={() => setShow(true)}
				>
					<AntDesign name='delete' size={24} color='white' />
				</Button>
			</HStack>
		</VStack>
	)
}
