import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const monsterSliceName = 'monster'

interface MonsterState {
	name: string
}

const initialState = { name: '...' } as MonsterState

const monsterSlice = createSlice({
	name: 'monster',
	initialState,
	reducers: {
		setName(state, action: PayloadAction<string>) {
			console.log('Setting a new monster name!', action.payload)
			state.name = action.payload
		},
	},
})

const selectMonsterSlice = (rootState: RootState): MonsterState => rootState[monsterSliceName]
export const monsterNameSelector = createSelector([selectMonsterSlice], (state) => state.name)

export const { setName } = monsterSlice.actions
export default monsterSlice.reducer
