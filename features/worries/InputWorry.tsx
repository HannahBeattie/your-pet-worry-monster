import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Heading, HStack, Pressable, Spacer, TextArea, VStack } from 'native-base'
import React from 'react'
import { Dimensions, Keyboard } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import HomeButton from '~features/layout/HomeButton'
import Scroll from '~features/layout/Scroll'
import SimpleHome from '~features/layout/SimpleHome'
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
			<VStack variant='page' h={h} flex={1} justifyItems={'stretch'}>
				<HStack alignContent={'flex-end'} justifyItems={'flex-end'} alignSelf={'flex-end'}>
					<Pressable
						mt={-10}
						pb={4}
						onPress={() => {
							router.push('/monsterMenu')
						}}
					>
						<Entypo name='cross' size={24} color='white' />
					</Pressable>
				</HStack>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<VStack color={'black'} space={4} pb={10}>
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
							maxLength={200}
							color={'black'}
							autoCompleteType
						/>
						<Heading textAlign={'start'} color={'white'}>
							Where, in your body, do you notice the worry?
						</Heading>
						<TextArea
							autoCompleteType
							value={third}
							onChangeText={handleThird}
							bgColor={'white'}
							aria-label='text-area'
							fontSize={'xl'}
							placeholder='I feel it...'
							maxLength={200}
							color={'black'}
						/>

						<Heading color={'white'} textAlign={'start'}>
							What is the scariest bit of that worry?
						</Heading>

						<TextArea
							autoCompleteType
							bgColor={'white'}
							aria-label='text-area'
							fontSize={'xl'}
							placeholder='The scariest bit is...'
							color={'black'}
							onChangeText={handleSeccond}
							value={seccond}
							maxLength={100}
						/>
					</VStack>
				</TouchableWithoutFeedback>
				<Button
					backgroundColor={'violet.300'}
					onPress={() => {
						handleWorrySubmit()
					}}
				>
					<Heading color={'violet.900'} fontWeight={'800'} textTransform={'uppercase'}>
						Add worry
					</Heading>
				</Button>
			</VStack>
		</ScrollView>
	)
}
