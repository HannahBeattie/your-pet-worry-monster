import { Icon, View } from 'native-base'
import React from 'react'
// @ts-ignore
import Fab from 'rn-fab'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

export default function FabButton() {
	const actions = [
		// main button
		{
			icon: <AntDesign name='plus' size={24} color='black' />,
			name: 'btn_plus',
			color: '#2a57c6',
		},
		// action buttons - will be displayed when you tap the main button.
		{
			text: 'past worries',

			icon: <FontAwesome name='history' size={24} color='black' />,
			// name: 'btn_detail',
			color: '#ee4343',
		},
		{
			text: 'Add worry',

			icon: <AntDesign name='plus' size={24} color='black' />,
			// name: 'btn_favorite',
			color: '#fdce4b',
		},
	]
	return (
		<Fab
			actions={actions}
			style={{ bottom: 100, right: 0, left: 0 }}
			rotation={'45deg'}
			onPress={(name: string) => {
				if (name == 'btn_detail') {
					alert(`Hi, you clicked on ${name}`)
				}
			}}
		/>
	)
}
