import {
	Poppins_300Light as poppinsLight,
	Poppins_500Medium as poppinsMedium,
	Poppins_700Bold as poppinsBold,
	useFonts,
} from '@expo-google-fonts/poppins'
import { Drawer } from 'expo-router/drawer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~features/store'
import { StyleProvider } from '~features/theme/StyleProvider'

import {
	Gaegu_300Light as monsterLight,
	Gaegu_400Regular as monsterFont,
	Gaegu_700Bold as monsterBold,
} from '@expo-google-fonts/gaegu'
import {
	Karla_300Light as readLight,
	Karla_400Regular as read,
	Karla_600SemiBold as readSemiBold,
	Karla_700Bold as readBold,
	Karla_800ExtraBold as readDaddyBold,
} from '@expo-google-fonts/karla'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		poppinsBold,
		poppinsLight,
		poppinsMedium,
		monsterFont,
		monsterLight,
		monsterBold,
		readLight,
		readSemiBold,
		readDaddyBold,
		read,
		readBold,
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
