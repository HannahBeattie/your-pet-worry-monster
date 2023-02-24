import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Divider, Heading, HStack, Image, Input, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setName } from '~features/monster/monsterSlice'

function name() {
	const gregoryBlue = require('../assets/blue.png')
	const [value, setValue] = React.useState('')
	const [error, setError] = React.useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
		// if (value.length < 1) setError('I need a name')
		// if (value.length < 2)
	}

	const placeHolderText = 'name'

	const handlePress = () => {
		dispatch(setName(value))
		if (value.length < 1) {
			setError('First, I need a name')
		} else if (value.length < 3) {
			setError('Seems a little short for a name...')
		} else {
			router.push('/confirmName')
			setValue('')
		}
	}

	return (
		<VStack variant={'page'} alignItems={'stretch'} py={100} flex={1}>
			<VStack px={2}>
				<Heading>Hmm... what should I call mysef?</Heading>
				<Input
					onChangeText={handleChange}
					value={value}
					multiline
					color={'white'}
					placeholderTextColor={'blueGray.500'}
					placeholder={placeHolderText}
					size='2xl'
					fontSize='2xl'
					fontFamily='Poppins_300Light'
					variant={'unstyled'}
					autoCapitalize='none'
					mb={-2}
					mx={-2}
				/>
				<Divider color={'white'} />
				<Text color={'red.500'} fontSize={'sm'}>
					{error}
				</Text>
				<HStack pt={4}>
					<Spacer />
					<TouchableOpacity
						onPress={() => {
							handlePress()
						}}
					>
						<Button backgroundColor={'gray.100'}>
							<Feather name='check' size={24} color='black' />
						</Button>
					</TouchableOpacity>
				</HStack>
			</VStack>
			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
		</VStack>
	)
}

export default name
