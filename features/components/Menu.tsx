import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import DangerousDelete from './DangerousDelete'
import Gregory from './Gregory'
import InputName from './InputName'
import InputWorry from './InputWorry'
import ListAllWorries from './ListAllWorries'

const Drawer = createDrawerNavigator()

export default function Menu() {
	return (
		<Drawer.Navigator initialRouteName='Home'>
			<Drawer.Screen options={{ headerShown: false }} name='Add Name' component={InputName} />
			<Drawer.Screen
				options={{ headerShown: false }}
				name='TimeLine'
				component={ListAllWorries}
			/>
			<Drawer.Screen options={{ headerShown: false }} name='Gregory' component={Gregory} />
			<Drawer.Screen
				options={{ headerShown: false }}
				name='Add Worry'
				component={InputWorry}
			/>
			<Drawer.Screen
				options={{ headerShown: false }}
				name='Delete'
				component={DangerousDelete}
			/>
		</Drawer.Navigator>
	)
}
