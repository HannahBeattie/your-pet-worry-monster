import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'

import { FloatingAction } from 'react-native-floating-action'
import { useSelector } from 'react-redux'
import { selectAllActive } from '~features/worries/worrySlice'

const two = [
	{
		text: 'Add Worry',
		icon: <FontAwesome name='plus' size={24} color='red' />,
		name: 'addWorry',
		position: 1,
		color: 'orange',
		textColor: 'white',
		textBackground: 'black',
		textStyle: { fontSize: 14, fontWeight: '600' },
	},
	{
		text: 'Past Worries',
		icon: <FontAwesome name='history' size={24} color='white' />,
		name: 'foodDiary',
		position: 2,
		color: '#1d4f5c',
		textColor: 'white',
		textStyle: { fontSize: 14, fontWeight: '600' },
		textBackground: 'black',
	},

	{
		text: 'Current Worries',
		icon: <FontAwesome name='exclamation' size={24} color='white' />,
		name: 'current',
		position: 2,
		color: '#d6507d',
		textColor: 'white',
		textStyle: { fontSize: 14, fontWeight: '600' },
		textBackground: 'black',
	},
]
function MyFab({ props, position }: any) {
	const currentWorries = useSelector(selectAllActive)
	const [active, setActive] = useState(false)
	const handleClick = () => {
		setActive(!active)
	}

	const router = useRouter()
	return (
		<FloatingAction
			overlayColor='none'
			color={active ? '#956786' : '#3e8a96'}
			actions={two}
			position={position ? position : 'left'}
			distanceToEdge={{ horizontal: 0, vertical: 0 }}
			onOpen={handleClick}
			onClose={handleClick}
			onPressItem={(name) => {
				router.push(`/${name}`)
			}}
			{...props}
		/>
	)
}

export default MyFab
