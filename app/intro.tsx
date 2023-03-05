import { Center } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIntroPlayed } from '~features/intro/introSlice'
import MonsterVoice from '~features/styledComponents/MonsterVoice'

// !!STATE1 &&
// fade in from black, center screen
//'GRRR!', 'ROAR', 'GROWLLLLL!', 'I am the dreaded....'

// layout changes ----- //text appears at top of page //

//"WORRY MONSTER!!"

// Gregory blue appears, smiling

//text sequence continues above him :

// "I like to eat worries!"
// "Delicious!"
// "My name is..."
// "Wait!"

// Gregory looks sad/confused

//text sequence continues above him :

// "I don't have a name!"
// "I can't be a fearsome worry monster without a name!"

//SET STATE : ONE PLAYED
//link to '/name' which is followed by '/confirm name'

// STATEONE & !!STATE2 &&  :

// text sequence continues above gregory:

// "*GURGLE GURLGE*"
// "I am hungry!"
// "Do you have any worries for me to eat?"

// buttons appear :
// ADD WORRY ---- '/addWorry'  === intro played
// MAYBE LATER --- '/' === intro played

// ELSE REG HOME SCREEN

function intro() {
	const dispatch = useDispatch()
	const [state1, setState1] = useState(false)
	const [state2, setState2] = useState(false)

	useEffect(() => {
		// Do something when any of the state values change
		console.log('state1:', state1)
		console.log('state2:', state2)
	}, [state1, state2])

	const introPlayed = () => dispatch(setIntroPlayed(true))

	return (
		<Center flex={1} bg={'black'}>
			<MonsterVoice sizeVal={'8xl'} color='blueGray.200'>
				GRRRR!
			</MonsterVoice>
		</Center>
	)
}

export default intro
