import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

type Worry = {
	id: string
	description: string
	extraNote: string
	isActive: boolean
}

const worryAdapter = createEntityAdapter<Worry>({
	// selectId: (worry) => worry.id,
	// Keep the "all IDs" array sorted based on id timestamp
	sortComparer: (a, b) => a.id.localeCompare(b.id),
})

const worrySlice = createSlice({
	name: 'worries',
	initialState: worryAdapter.getInitialState(),
	reducers: {
		worryAdded: worryAdapter.addOne,
		worryDeleted: worryAdapter.removeOne,
		worryFinished: worryAdapter.updateOne,
	},
})

export const { worryAdded, worryDeleted, worryFinished } = worrySlice.actions
export default worrySlice.reducer
