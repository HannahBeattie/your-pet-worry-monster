import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'

import { FloatingAction } from 'react-native-floating-action'
import { useSelector } from 'react-redux'
import { selectAllActive, selectAllInactive } from '~features/worries/worrySlice'

const past = {
	text: 'Past Worries',
	icon: <FontAwesome name='history' size={24} color='white' />,
	name: 'foodDiary',
	position: 2,
	color: '#acaedba0',
	textColor: 'white',
	textStyle: { fontSize: 14, fontWeight: '600' },
	textBackground: 'black',
}

const current = {
	text: 'Current Worries',
	icon: <FontAwesome name='exclamation' size={24} color='white' />,
	name: 'current',
	position: 2,
	color: '#a25a9492',
	textColor: 'white',
	textStyle: { fontSize: 14, fontWeight: '600' },
	textBackground: 'black',
}

const add = [
	{
		text: 'Add Worry',
		icon: <FontAwesome name='plus' size={24} color='white' />,
		name: 'addWorry',
		position: 1,
		color: '#306785e8',
		textColor: 'white',
		textBackground: 'black',
		textStyle: { fontSize: 14, fontWeight: '600' },
	},
]
function MyFab({ props, position }: any) {
	const currentWorries = useSelector(selectAllActive)
	const pastWorries = useSelector(selectAllInactive)
	const [active, setActive] = useState(false)
	const handleClick = () => {
		setActive(!active)
	}

	let items = [...add] // start with the add button always being present

	if (currentWorries.length > 0) {
		items.push(current)
	}

	if (pastWorries.length > 0) {
		items.push(past)
	}

	const router = useRouter()
	return (
		<FloatingAction
			overlayColor='none'
			color={active ? '#3e7583b6' : '#2d2b3470'}
			actions={items}
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
