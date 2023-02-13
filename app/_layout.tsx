import { Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { store } from '../features/store'

export default function Layout() {
	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</NativeBaseProvider>
		</Provider>
	)
}
