import { useRouter } from 'expo-router'
import { Button, Heading, Spacer, TextArea, VStack } from 'native-base'
import React from 'react'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import HomeButton from '~features/layout/HomeButton'
import { addWorry, worriesSelectors } from '~features/worries/worrySlice'

export default function InputWorry() {
	const router = useRouter()
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
		router.push('/savingWorry')
	}

	const data = useSelector(worriesSelectors.selectAll)

	console.log('data is', data)
	return (
		<VStack variant='page'>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<VStack color={'black'} space={10}>
					<Heading textAlign={'start'} color={'white'}>
						What are you worried about?
					</Heading>
					<TextArea
						autoCompleteType
						bgColor={'white'}
						aria-label='text-area'
						fontSize={'xl'}
						placeholder='I am worries about...'
						onChangeText={handleFirst}
						value={first}
						maxLength={400}
						color={'black'}
					/>

					<Heading color={'white'} textAlign={'start'}>
						What is the scariest bit of that worry?
					</Heading>

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
					/>
				</VStack>
			</TouchableWithoutFeedback>

			<Button
				onPress={() => {
					handleWorrySubmit()
				}}
			>
				<Heading>Add worry</Heading>
			</Button>

			<HomeButton />
		</VStack>
	)
}
