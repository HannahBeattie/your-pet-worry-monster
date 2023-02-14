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

function InputWorry() {
	const [first, setValue] = React.useState('')
	const [seccond, setSeccond] = React.useState('')
	const handleFirst = (first: string) => setValue(first)
	const handleSeccond = (seccond: string) => setSeccond(seccond)
	const dispatch = useDispatch()
	return (
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
				h='25%'
				maxW='300'
				maxLength={400}
			/>

			<Heading color={'white'}>What is the scariest bit of that worry?</Heading>
			<TextArea
				autoCompleteType={true}
				bgColor={'white'}
				aria-label='text-area'
				fontSize={'xl'}
				h='25%'
				placeholder='The scariest bit is...'
				onChangeText={handleSeccond}
				value={seccond}
				maxLength={400}
			/>

			<Button
				bgColor={'blue.200'}
				rounded='none'
				onPress={() => {
					alert('todo: dispatch and save')
				}}
			>
				<Text color={'black'} fontWeight={'800'}>
					Add Worry
				</Text>
			</Button>
			<HStack alignItems={'center'}>
				<Entypo name='chevron-small-left' size={32} color='white' />
				<Text color={'gray.400'}>Back</Text>
			</HStack>
		</VStack>
	)
}

export default InputWorry
