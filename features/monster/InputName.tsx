import { Entypo, Fontisto } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Fab, Heading, Icon, IconButton, Image, Input, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setName } from '~features/monster/monsterSlice'

function InputName() {
	const icons = [
		<Icon as={Fontisto} color={'purple.800'} name='question' />,
		<Icon as={Entypo} color={'purple.800'} name='check' />,
	]
	const [value, setValue] = React.useState('')
	const [currentIcon, setCurrentIcon] = React.useState(icons[0])

	const dispatch = useDispatch()
	const gregoryBlue = require('../../assets/blue.png')
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
		if (value.length > 3) setCurrentIcon(icons[1])
		if (value.length < 3) setCurrentIcon(icons[0])
	}
	const placeHolderText = 'my name is...'

	const handlePress = () => {
		dispatch(setName(value))
		router.push('/confirmName')
		setValue('')
	}

	return (
		<VStack flex={1} py={10} space={8}>
			<Heading fontSize={'4xl'} color={'white'} textAlign={'center'}>
				Hmm... What should I call myself?
			</Heading>

			<Input
				fontSize={'lg'}
				w='full'
				variant='outline'
				onChangeText={handleChange}
				value={value}
				placeholder={placeHolderText}
				fontWeight={'800'}
			/>

			<IconButton
				alignSelf={'center'}
				boxSize={'10'}
				backgroundColor={'teal.500'}
				icon={currentIcon}
				borderRadius='full'
				size={'lg'}
				onPress={() => {
					handlePress()
				}}
			/>

			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
		</VStack>
	)
}

export default InputName
