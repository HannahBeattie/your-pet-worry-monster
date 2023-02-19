import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer'
import { useNavigation, withLayoutContext } from 'expo-router'
import { Button } from 'react-native'

import DangerousDelete from './DangerousDelete'
import Gregory from './Gregory'
import InputName from './InputName'
import InputWorry from './InputWorry'
import YouHaveWorried from './YouHaveWorried'
// import { Drawer as RDrawer } from 'expo-router/drawer'

const Drawer = createDrawerNavigator()
// const { Navigator, Screen } = createDrawerNavigator()
// export const Drawer = withLayoutContext<
//   DrawerNavigationOptions,
//   typeof Navigator
// >(Navigator);

export default function MenuDraw() {
	// const navigation = useNavigation()
	return (
		<>
			<Drawer.Navigator>
				<Drawer.Screen
					options={{ headerShown: false }}
					name='InputWorry'
					component={InputWorry}
				/>
				<Drawer.Screen options={{ headerShown: false }} name='Greg' component={Gregory} />
				<Drawer.Screen
					options={{ headerShown: false }}
					name='Name Me'
					component={InputName}
				/>
				<Drawer.Screen
					options={{ headerShown: false }}
					name='Timeline'
					component={YouHaveWorried}
				/>
				<Drawer.Screen
					options={{ headerShown: false }}
					name='Delete'
					component={DangerousDelete}
				/>
			</Drawer.Navigator>
		</>
	)
}
