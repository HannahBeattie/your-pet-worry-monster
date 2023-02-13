import { configureStore } from '@reduxjs/toolkit'
import monsterSliceReducer, { monsterSliceName } from './monster/monsterSlice'
import worrySliceReducer from './worries/worrySlice'

export const store = configureStore({
	reducer: {
		worries: worrySliceReducer,
		[monsterSliceName]: monsterSliceReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
