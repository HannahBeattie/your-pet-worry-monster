import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Center, Divider, HStack, Icon, IconButton, Input, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { Keyboard, Touchable, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import { setName } from '~features/monster/monsterSlice'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'

export default function Name() {
	const [value, setValue] = React.useState('')
	const [error, setError] = React.useState(' ')
	const dispatch = useDispatch()
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
		if (value.length > 2) {
			setError(' ')
		}
	}

	const placeHolderText = 'name'

	const handlePress = () => {
		dispatch(setName(value.trimEnd()))
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
		<PageWrapper>
			<TouchableWithoutFeedback
				style={{ flex: 1 }}
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<VStack>
					<VStack space={4} mb={-2}>
						<VStack py={2} alignSelf={'center'}>
							<MonsterVoice sizeVal={'27'}>What should I call mysef?</MonsterVoice>
						</VStack>
						<Input
							maxLength={25}
							autoFocus={false}
							onChangeText={handleChange}
							value={value}
							color={'white'}
							placeholderTextColor={'blueGray.500'}
							placeholder={placeHolderText}
							fontSize='xl'
							fontFamily='poppinsLight'
							variant={'unstyled'}
							autoCapitalize='none'
							px={10}
							mx={-5}
						/>
					</VStack>
					<Divider color={'white'} />

					<VStack>
						<Text color={'red.500'} fontSize={'sm'} mt={0} p={2} px={1}>
							{error}
						</Text>

						<HStack mt={-6}>
							<Spacer />
							<CircleIconButton
								color={checkColor}
								handlePress={handlePress}
								arealabel='check for yess'
								tag='check'
								bg={'gray.800'}
								size={'md'}
							/>
						</HStack>
					</VStack>
				</VStack>
			</TouchableWithoutFeedback>

			<FullBlue monsterMood='hmmm' />
		</PageWrapper>
	)
}
