import { Drawer } from 'expo-router/drawer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~features/store'
import { StyleProvider } from '~features/theme/StyleProvider'
import {
	useFonts,
	Poppins_500Medium,
	Poppins_300Light,
	Poppins_600SemiBold,
	Poppins_400Regular,
} from '@expo-google-fonts/poppins'
import { Miniver_400Regular } from '@expo-google-fonts/miniver'
import { Neucha_400Regular } from '@expo-google-fonts/neucha'
import { NanumPenScript_400Regular } from '@expo-google-fonts/nanum-pen-script'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Poppins_500Medium,
		Poppins_300Light,
		Miniver_400Regular,
		Poppins_600SemiBold,
		Poppins_400Regular,
		Neucha_400Regular,
		NanumPenScript_400Regular,
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
