import { Stack } from 'expo-router'
import { NativeBaseProvider, Text } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Menu from '~features/components/Menu'
import { persistor, store } from '../features/store'

export default function Layout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NativeBaseProvider>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					/>
				</NativeBaseProvider>
			</PersistGate>
		</Provider>
	)
}
