import { Drawer } from 'expo-router/drawer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~features/store'
import { StyleProvider } from '~features/theme/StyleProvider'

export default function Layout() {
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
