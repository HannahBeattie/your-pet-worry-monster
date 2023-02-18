import Entypo from '@expo/vector-icons/Entypo'
import { Button, Heading, HStack, Input, IInputProps, Text, TextArea, VStack } from 'native-base'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import worrySlice, { addWorry, worriesSelectors } from '~features/worries/worrySlice'

type MyInputChangeHandler = (args: { name: string; value: string }) => void

function MyInput({
	name,
	onChangeTextWithName,
	...rest
}: IInputProps & {
	name: string
	onChangeTextWithName: MyInputChangeHandler
}) {
	return <Input {...rest} onChangeText={(value) => onChangeTextWithName({ name, value })} />
}

type FormHandleyState = {
	title: string
	proudestMoment: string
}

function FormHandley() {
	const [formVal, setFormVal] = useState({
		title: 'Morky',
		proudestMoment: 'Stretch',
	} as FormHandleyState)
	console.log('FormVal is:', formVal)

	const handleChange: MyInputChangeHandler = useCallback(
		({ name, value }) => {
			console.log('Something changed:', name, value)
			setFormVal({
				...formVal,
				[name]: value,
			} as FormHandleyState)
		},
		[setFormVal]
	)

	return (
		<VStack alignSelf='stretch' alignItems='stretch'>
			<MyInput name='title' value={formVal.title} onChangeTextWithName={handleChange} />
			<MyInput
				name='proudestMoment'
				value={formVal.proudestMoment}
				onChangeTextWithName={handleChange}
			/>
		</VStack>
	)
}

function InputWorry() {
	const [first, setValue] = React.useState('')
	const [seccond, setSeccond] = React.useState('')
	const handleFirst = (first: string) => setValue(first)
	const handleSeccond = (seccond: string) => setSeccond(seccond)
	const dispatch = useDispatch()
	const worryValue = {
		id: new Date().toString(),
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

// export default InputWorry
export default FormHandley
