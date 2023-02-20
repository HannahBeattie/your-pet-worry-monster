import ExpandableFloatingAction from 'react-native-expandable-fab'

import { useRouter } from 'expo-router'
import { Box, Text } from 'native-base'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
function FabMenu() {
	const router = useRouter()
	return (
		<ExpandableFloatingAction
			mainColor='#74c8d5'
			secondaryColor='#F9B065'
			closeIcon={<AntDesign name='close' size={24} color='black' />}
			openIcon={<MaterialCommunityIcons name='dots-vertical' size={24} color='black' />}
			menuIcons={[
				{
					name: 'inviteToGroup',

					icon: <AntDesign name='plus' size={24} color='black' />,
					text: <Text>Add Worry</Text>,
					callback: () => {
						router.push('/addWorry')
					},
				},
				{
					name: 'createNewTask',

					icon: <FontAwesome name='history' size={24} color='black' />,
					text: <Text>Past Worries</Text>,
					callback: () => {
						router.push('/history')
					},
				},
			]}
		/>
	)
}

export default FabMenu
