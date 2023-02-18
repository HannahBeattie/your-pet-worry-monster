import { combineReducers, configureStore } from '@reduxjs/toolkit'
import monsterSliceReducer, { monsterSliceName } from './monster/monsterSlice'
import worrySliceReducer, { worrySliceName } from './worries/worrySlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

const rootReducer = combineReducers({
	[worrySliceName]: worrySliceReducer,
	[monsterSliceName]: monsterSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
})

// export const store = configureStore({
// 	reducer: {
// 		[worrySliceName]: worrySliceReducer,
// 		[monsterSliceName]: monsterSliceReducer,
// 	},
// })

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
