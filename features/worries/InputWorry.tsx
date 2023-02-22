import { useRouter } from 'expo-router'
import { Button, Heading, Spacer, TextArea, VStack } from 'native-base'
import React from 'react'
import { Dimensions, Keyboard } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import HomeButton from '~features/layout/HomeButton'
import Scroll from '~features/layout/Scroll'
import { addWorry, worriesSelectors } from '~features/worries/worrySlice'

export default function InputWorry() {
	const router = useRouter()
	const dispatch = useDispatch()

	const [first, setValue] = React.useState('')
	const [third, setThird] = React.useState('')
	const [seccond, setSeccond] = React.useState('')
	const handleFirst = (first: string) => setValue(first)
	const handleSeccond = (seccond: string) => setSeccond(seccond)
	const handleThird = (third: string) => setThird(third)

	const worryValue = {
		id: +new Date(),
		description: first,
		extraNote: seccond,
		isActive: true,
	}
	const handleWorrySubmit = () => {
		dispatch(addWorry(worryValue))
		setValue('')
		setSeccond('')
		setThird('')
		router.push('/savingWorry')
	}

	const h = Dimensions.get('window').height

	return (
		<ScrollView overScrollMode='never'>
			<VStack variant='page' h={h} flex={1}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<VStack color={'black'} space={4}>
						<Heading textAlign={'start'} color={'white'}>
							What are you feeling worried about?
						</Heading>
						<TextArea
							bgColor={'white'}
							aria-label='text-area'
							fontSize={'xl'}
							placeholder='I am worried about...'
							onChangeText={handleFirst}
							value={first}
							maxLength={400}
							color={'black'}
						/>
						<Heading textAlign={'start'} color={'white'}>
							Where, in your body, do you notice the worry?
						</Heading>
						<TextArea
							value={third}
							onChangeText={handleThird}
							bgColor={'white'}
							aria-label='text-area'
							fontSize={'xl'}
							placeholder='I feel it...'
							maxLength={400}
							color={'black'}
						/>

						<Heading color={'white'} textAlign={'start'}>
							What is the scariest bit of that worry?
						</Heading>

						<TextArea
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
			</VStack>

			<VStack variant={'page'} h={h / 2}>
				<HomeButton />
			</VStack>
		</ScrollView>
	)
}
