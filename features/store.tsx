import { configureStore } from '@reduxjs/toolkit'
import monsterSliceReducer, { monsterSliceName } from './monster/monsterSlice'
import worrySliceReducer, { worrySliceName } from './worries/worrySlice'

export const store = configureStore({
	reducer: {
		[worrySliceName]: worrySliceReducer,
		[monsterSliceName]: monsterSliceReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
