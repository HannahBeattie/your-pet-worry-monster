import { Drawer } from 'expo-router/drawer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~features/store'
import { StyleProvider } from '~features/theme/StyleProvider'
import {
	useFonts,
	Poppins_500Medium as poppinsMedium,
	Poppins_300Light as poppinsLight,
	Poppins_700Bold as poppinsBold,
} from '@expo-google-fonts/poppins'

import { GloriaHallelujah_400Regular as maybeMonster } from '@expo-google-fonts/gloria-hallelujah'
import {
	Gaegu_300Light as monsterLight,
	Gaegu_400Regular as monsterFont,
	Gaegu_700Bold as monsterBold,
} from '@expo-google-fonts/gaegu'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		poppinsBold,
		poppinsLight,
		poppinsMedium,
		monsterFont,
		monsterLight,
		monsterBold,
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
