import { Slot, Stack } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { NativeBaseProvider, Text, VStack } from 'native-base'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../features/store'

export default function Layout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NativeBaseProvider>
					<Drawer
						screenOptions={{
							headerShown: false,
						}}
					/>
				</NativeBaseProvider>
			</PersistGate>
		</Provider>
	)
}
