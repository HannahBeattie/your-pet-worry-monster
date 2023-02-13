import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '../features/store'

// import { configureStore } from '@reduxjs/toolkit'
// import monsterSliceReducer, { monsterSliceName } from '../features/monster/monsterSlice'
// import worrySliceReducer from '../features/worries/worrySlice'
//
// const store = configureStore({
// 	reducer: {
// 		worries: worrySliceReducer,
// 		[monsterSliceName]: monsterSliceReducer,
// 	},
// })

// export type RootState = ReturnType<typeof store.getState>

export default function Layout() {
	return (
		<Provider store={store}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</Provider>
	)
}
