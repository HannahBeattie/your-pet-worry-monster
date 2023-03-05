import { Heading } from 'native-base'
import React from 'react'
import PageWrapper from '~features/styledComponents/PageWrapper'

// fade in from black, center screen
//'GRRR!', 'ROAR', 'GROWLLLLL!', 'I am the dreaded....'

//text appears at top of page
//"WORRY MONSTER!!"

// Gregory blue appears, smiling

//text sequence continues above him :
// "I like to eat worries!"
// "Delicious!"
// "My name is..."
// "Wait!"

// Gregory looks sad/confused

// "I don't have a name!"
// "I can't be a fearsome worry monster without a name!"

//link to '/name' which is followed by '/confirm name'

////----SEPPERATE COMPONENT?-----////

// text sequence continues above gregory:

// "*GURGLE GURLGE*"
// "I am hungry!"
// "Do you have any worries for me to eat?"

// buttons appear :
// ADD WORRY ---- '/addWorry'  === intro played
// MAYBE LATER --- '/' === intro played

function intro() {
	return (
		<PageWrapper>
			<Heading>intro goes here!</Heading>
		</PageWrapper>
	)
}

export default intro
