import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~features/store'

export const introSliceName = 'intro'

export type IntroState = {
	introPlayed: boolean
	firstplayed: boolean
}
const initialState = { introPlayed: false } as IntroState
const introSlice = createSlice({
	name: 'intro',
	initialState,
	reducers: {
		setIntroPlayed(state, action: PayloadAction<boolean>) {
			state.introPlayed = action.payload
		},
		setFirstPlayed(state, action: PayloadAction<boolean>) {
			state.firstplayed = action.payload
		},
	},
})

const selectIntroSlice = (rootstate: RootState): IntroState => rootstate[introSliceName]

export const introStateSelector = createSelector([selectIntroSlice], (state) => state.introPlayed)
export const firstPlayedSelector = createSelector([selectIntroSlice], (state) => state.firstplayed)

export const { setIntroPlayed, setFirstPlayed } = introSlice.actions
export default introSlice.reducer
