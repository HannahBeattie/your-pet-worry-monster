import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~features/store'

export const worrySliceName = 'worries'

type Worry = {
	id: string
	description: string
	extraNote: string
	isActive: boolean
}

const worriesAdapter = createEntityAdapter<Worry>({
	selectId: (worry) => worry.id,
})

const initialWorriesState = worriesAdapter.getInitialState()

export type WorriesState = typeof initialWorriesState

const worrySlice = createSlice({
	name: 'worries',
	initialState: initialWorriesState,
	reducers: {
		addWorry: worriesAdapter.addOne,
		deleteWorry: worriesAdapter.removeOne,
		updateWorry: worriesAdapter.updateOne,
	},
})

export const { addWorry, deleteWorry, updateWorry } = worrySlice.actions
export default worrySlice.reducer

export const selectWorrySlice = (rootState: RootState): WorriesState => rootState[worrySliceName]
export const worriesSelectors = worriesAdapter.getSelectors<RootState>(selectWorrySlice)

// export const worrySelector = createSelector([selectWorrySlice], (state) => state.id)
