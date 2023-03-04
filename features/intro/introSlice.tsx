import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~features/store'

export const introSliceName = 'intro'

export type IntroState = {
	introPlayed: boolean
}
const initialState = { introPlayed: false } as IntroState
const introSlice = createSlice({
	name: 'intro',
	initialState,
	reducers: {
		setIntroPlayed(state, action: PayloadAction<boolean>) {
			state.introPlayed = action.payload
		},
	},
})

const selectIntroSlice = (rootstate: RootState): IntroState => rootstate[introSliceName]

export const introStateSelector = createSelector([selectIntroSlice], (state) => state.introPlayed)

export const { setIntroPlayed } = introSlice.actions
export default introSlice.reducer
