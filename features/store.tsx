import { combineReducers, configureStore } from '@reduxjs/toolkit'
import monsterSliceReducer, { monsterSliceName } from './monster/monsterSlice'
import worrySliceReducer, { worrySliceName } from './worries/worrySlice'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const rootReducer = combineReducers({
	[worrySliceName]: worrySliceReducer,
	[monsterSliceName]: monsterSliceReducer,
})

const persistedReducer = persistReducer(
	{
		key: 'root',
		storage: AsyncStorage,
	},
	rootReducer
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
