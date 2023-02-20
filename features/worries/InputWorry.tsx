import Entypo from '@expo/vector-icons/Entypo'
import { Button, Heading, HStack, Text, TextArea, VStack } from 'native-base'
import React from 'react'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { addWorry, worriesSelectors } from '~features/worries/worrySlice'

function InputWorry() {
	const [first, setValue] = React.useState('')
	const [seccond, setSeccond] = React.useState('')
	const handleFirst = (first: string) => setValue(first)
	const handleSeccond = (seccond: string) => setSeccond(seccond)
	const dispatch = useDispatch()
	const worryValue = {
		id: +new Date(),
		description: first,
		extraNote: seccond,
		isActive: true,
	}

	const handleWorrySubmit = () => {
		console.log('trying to add new worry!', worryValue)
		dispatch(addWorry(worryValue))
		setValue('')
		setSeccond('')
	}
	// const data = worrySelector(worryState)
	const data = useSelector(worriesSelectors.selectAll)

	console.log('data is', data)
	return (
		<VStack flex={1} alignItems={'stretch'} justifyContent={'space-evenly'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<VStack space={8} color={'black'}>
					<Heading color={'white'}>What are you worried about?</Heading>
					<TextArea
						autoCompleteType
						bgColor={'white'}
						aria-label='text-area'
						fontSize={'xl'}
						placeholder='I am worries about...'
						onChangeText={handleFirst}
						value={first}
						maxLength={400}
						minH={100}
						color={'black'}
					/>

					<Heading color={'white'}>What is the scariest bit of that worry?</Heading>

					<TextArea
						autoCompleteType={true}
						bgColor={'white'}
						aria-label='text-area'
						fontSize={'xl'}
						placeholder='The scariest bit is...'
						color={'black'}
						onChangeText={handleSeccond}
						value={seccond}
						maxLength={400}
						minH={100}
					/>
				</VStack>
			</TouchableWithoutFeedback>
			<VStack paddingY={8} marginTop={10}>
				<Button
					bgColor={'blue.200'}
					rounded='none'
					onPress={() => {
						handleWorrySubmit()
					}}
				>
					<Text color={'black'} fontWeight={'800'}>
						Add Worry
					</Text>
				</Button>
			</VStack>
		</VStack>
	)
}

export default InputWorry
