import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '~features/store'

export const worrySliceName = 'worries'

export type Worry = {
	id: number
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
		deleteAllWorries: worriesAdapter.removeAll,
		updateWorry: worriesAdapter.updateOne,
	},
})
export const selectWorrySlice = (rootState: RootState): WorriesState => rootState[worrySliceName]
export const worriesSelectors = worriesAdapter.getSelectors<RootState>(selectWorrySlice)

export const selectAllActive = createSelector([worriesSelectors.selectAll], (all) =>
	all.filter((worry) => worry.isActive)
)
export const selectAllInactive = createSelector([worriesSelectors.selectAll], (all) =>
	all.filter((worry) => !worry.isActive)
)

export const { addWorry, deleteWorry, updateWorry, deleteAllWorries } = worrySlice.actions
export default worrySlice.reducer

export const selectLastActiveItem = createSelector(
	[selectAllActive],
	(active) => active[active.length - 1]
)
