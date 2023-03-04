import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~features/store'

export const introSliceName = 'intro'

export type IntroState = {
	introPlayed: boolean
	firstPlayed?: boolean
	seccondPlayed?: boolean
	thirdPlayed?: boolean
}
const initialState = { introPlayed: false, firstPlayed: false, seccondPlayed: false } as IntroState
const introSlice = createSlice({
	name: 'intro',
	initialState,
	reducers: {
		setIntroPlayed(state, action: PayloadAction<boolean>) {
			state.introPlayed = action.payload
		},

		setFirstPlayed(state, action: PayloadAction<boolean>) {
			state.firstPlayed = action.payload
		},
		setseccondPlayed(state, action: PayloadAction<boolean>) {
			state.seccondPlayed = action.payload
		},
		setThirdPlayed(state, action: PayloadAction<boolean>) {
			state.thirdPlayed = action.payload
		},
	},
})

const selectIntroSlice = (rootstate: RootState): IntroState => rootstate[introSliceName]

export const introStateSelector = createSelector([selectIntroSlice], (state) => state.introPlayed)
export const firstIntroSelector = createSelector([selectIntroSlice], (state) => state.firstPlayed)
export const seccondIntroSelector = createSelector(
	[selectIntroSlice],
	(state) => state.seccondPlayed
)
export const thirdIntroSelector = createSelector([selectIntroSlice], (state) => state.firstPlayed)

export const { setIntroPlayed, setseccondPlayed, setFirstPlayed, setThirdPlayed } =
	introSlice.actions

export default introSlice.reducer
