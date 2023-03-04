import React from 'react'
import { useSelector } from 'react-redux'
import First from '~features/intro/First'
import { seccondIntroSelector, thirdIntroSelector } from '~features/intro/introSlice'
import Seccond from '~features/intro/Seccond'
import Third from '~features/intro/Third'

function Intro() {
	const firstPlayed = useSelector(thirdIntroSelector)
	const seccondPlayed = useSelector(seccondIntroSelector)

	return (
		<>
			{!firstPlayed && <First />}
			{firstPlayed && !seccondPlayed && <Seccond />}
			{firstPlayed && seccondPlayed && <Third />}
		</>
	)
}

export default Intro
