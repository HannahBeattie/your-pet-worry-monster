import { Drawer } from 'expo-router/drawer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~features/store'
import { StyleProvider } from '~features/theme/StyleProvider'
import { useFonts, Poppins_500Medium, Poppins_300Light } from '@expo-google-fonts/poppins'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Poppins_500Medium,
		Poppins_300Light,
	})

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StyleProvider>
					<Drawer
						screenOptions={{
							headerShown: false,
						}}
					/>
				</StyleProvider>
			</PersistGate>
		</Provider>
	)
}
