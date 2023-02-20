import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'
import { Button, Heading, HStack, Spacer, Text, TextArea, VStack } from 'native-base'
import React from 'react'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { addWorry, worriesSelectors } from '~features/worries/worrySlice'

function InputWorry() {
	const router = useRouter()
	const name = useSelector(monsterNameSelector)
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
		<VStack flex={1} alignItems={'stretch'}>
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
			<Spacer />
			<Button
				onPress={() => {
					handleWorrySubmit()
				}}
			>
				<Heading>Add worry</Heading>
			</Button>

			<Button
				onPress={() => {
					router.push('/monsterMenu')
				}}
			>
				<Heading>Back to {name}</Heading>
			</Button>
		</VStack>
	)
}

export default InputWorry
