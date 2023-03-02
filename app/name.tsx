import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Button,
	Divider,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setName } from '~features/monster/monsterSlice'
import { ButtonLight } from '~features/theme/buttons'

function name() {
	const gregoryBlue = require('../assets/blue.png')
	const [value, setValue] = React.useState('')
	const [error, setError] = React.useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
	}

	const placeHolderText = 'name'

	const handlePress = () => {
		dispatch(setName(value))
		if (value.length < 1) {
			setError('First, I need a name')
		} else if (value.length < 3) {
			setError('Seems a little short for a name...')
		} else {
			setError('')
			router.push('/confirmName')
			setValue('')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<VStack variant={'intro'}>
				<VStack px={2} space={2}>
					<Heading fontFamily={'monsterBold'}>Hmm... what should I call mysef?</Heading>
					<Input
						maxLength={25}
						onChangeText={handleChange}
						value={value}
						multiline
						color={'white'}
						placeholderTextColor={'blueGray.500'}
						placeholder={placeHolderText}
						size='2xl'
						fontSize='2xl'
						fontFamily='poppinsLight'
						variant={'unstyled'}
						autoCapitalize='none'
						mb={-2}
						mx={-2}
					/>
					<Divider color={'white'} />
					<Text color={'red.500'} fontSize={'sm'}>
						{error}
					</Text>
					<HStack>
						<Spacer />
						<IconButton
							onPress={handlePress}
							backgroundColor={'white'}
							borderRadius={'200'}
							icon={<Icon color={'black'} as={Feather} name={'check'} />}
						/>
					</HStack>
				</VStack>
				<Image
					alt={'blue the monster'}
					source={gregoryBlue}
					flex={1}
					resizeMode='contain'
				/>
			</VStack>
		</TouchableWithoutFeedback>
	)
}

export default name
