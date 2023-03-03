import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Divider, HStack, Icon, IconButton, Input, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import { setName } from '~features/monster/monsterSlice'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'

export default function Name() {
	const [value, setValue] = React.useState('')
	const [error, setError] = React.useState('')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
	}

	const placeHolderText = 'a good monster name'

	const handlePress = () => {
		dispatch(setName(value))
		if (value.length < 1) {
			setError('First, I need a name')
		} else if (value.length < 2) {
			setError('Seems a little short for a name...')
		} else {
			setError('')
			router.push('/confirmName')
			setValue('')
		}
	}
	const checkColor = value.length > 2 ? 'violet.400' : 'black'

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<PageWrapper>
				<VStack px={4} py={4}>
					<MonsterVoice>Hmm... what should I call mysef?</MonsterVoice>
				</VStack>
				<Input
					maxLength={25}
					onChangeText={handleChange}
					value={value}
					color={'white'}
					placeholderTextColor={'blueGray.500'}
					placeholder={placeHolderText}
					fontSize='xl'
					fontFamily='poppinsLight'
					variant={'unstyled'}
					autoCapitalize='none'
					mb={-2}
				/>

				<Divider color={'white'} />
				<Text color={'red.500'} fontSize={'sm'}>
					{error}
				</Text>
				<HStack>
					<Spacer />
					<IconButton
						onPress={handlePress}
						backgroundColor={'gray.800'}
						borderRadius={'200'}
						icon={<Icon color={checkColor} as={Feather} name={'check'} />}
					/>
				</HStack>
				<FullBlue monsterMood='happy' />
			</PageWrapper>
		</TouchableWithoutFeedback>
	)
}
