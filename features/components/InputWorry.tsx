import {
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	Input,
	Spacer,
	Text,
	TextArea,
	VStack,
} from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import Entypo from '@expo/vector-icons/Entypo'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'

function InputWorry() {
	const [first, setValue] = React.useState('')
	const [seccond, setSeccond] = React.useState('')
	const handleFirst = (first: string) => setValue(first)
	const handleSeccond = (seccond: string) => setSeccond(seccond)
	const dispatch = useDispatch()

	const handleWorrySubmit = () => console.log('toDo! handle submit')

	return (
		<VStack space={8}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<VStack space={8}>
					<Heading color={'white'}>What are you worried about?</Heading>

					<TextArea
						autoCompleteType
						bgColor={'white'}
						aria-label='text-area'
						fontSize={'xl'}
						placeholder='I am worries about...'
						onChangeText={handleFirst}
						value={first}
						maxW='300'
						minH={160}
						maxLength={400}
					/>

					<Heading color={'white'}>What is the scariest bit of that worry?</Heading>

					<TextArea
						autoCompleteType={true}
						bgColor={'white'}
						aria-label='text-area'
						fontSize={'xl'}
						placeholder='The scariest bit is...'
						onChangeText={handleSeccond}
						value={seccond}
						maxLength={400}
						minH={160}
					/>
				</VStack>
			</TouchableWithoutFeedback>

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
			<HStack alignItems={'center'}>
				<Button variant={'ghost'} p={0}>
					<Entypo name='chevron-small-left' size={32} color='white' />
				</Button>
			</HStack>
		</VStack>
	)
}

export default InputWorry
