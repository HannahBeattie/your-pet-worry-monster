import { Entypo, Fontisto, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Fab, Heading, Icon, IconButton, Image, Input, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setName } from '~features/monster/monsterSlice'

function InputName() {
	const icons = [
		<Icon as={MaterialCommunityIcons} name={'thought-bubble-outline'} color={'purple.800'} />,
		<Icon as={Entypo} color={'teal.300'} name='check' />,
	]
	const [value, setValue] = React.useState('')
	const [currentIcon, setCurrentIcon] = React.useState({ icon: icons[0], color: 'teal.300' })

	const dispatch = useDispatch()
	const gregoryBlue = require('../../assets/blue.png')
	const router = useRouter()

	const handleChange = (value: string) => {
		setValue(value)
		if (value.length > 3) setCurrentIcon({ icon: icons[1], color: 'purple.600' })
		if (value.length < 2) setCurrentIcon({ icon: icons[0], color: 'teal.500' })
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
				borderRadius={'full'}
				w='full'
				backgroundColor={'white'}
				p={4}
				variant='outline'
				onChangeText={handleChange}
				value={value}
				placeholder={placeHolderText}
				fontWeight={'800'}
				color={'purple.500'}
			/>

			<IconButton
				alignSelf={'center'}
				boxSize={'10'}
				backgroundColor={currentIcon.color}
				icon={currentIcon.icon}
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
