import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

import { FloatingAction } from 'react-native-floating-action'

const actions = [
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
		name: 'history',
		position: 2,
		color: '#0D98BA',
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
function MyFab() {
	const [active, setActive] = useState(false)
	const handleClick = () => {
		setActive(!active)
	}

	const router = useRouter()
	return (
		<FloatingAction
			overlayColor='none'
			color={active ? 'teal' : '#0D98BA'}
			actions={actions}
			position={'left'}
			distanceToEdge={{ horizontal: 0, vertical: 0 }}
			onOpen={handleClick}
			onClose={handleClick}
			onPressItem={(name) => {
				router.push(`/${name}`)
			}}
		/>
	)
}

export default MyFab
