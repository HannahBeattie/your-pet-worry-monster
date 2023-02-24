import { useRouter } from 'expo-router'
import { Button, Heading, VStack } from 'native-base'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

export default function Intro(): JSX.Element {
	const [step, setStep] = useState(0)
	const router = useRouter()

	// const updateStep = () => {
	// 	if (step === stepValues.length - 1) {
	// 		// router.push('/monsterMenu')
	// 	}
	// 	setStep(step + 1)
	// }

	const updateStep = () => {
		const newStep = step + 1
		if (newStep >= stepValues.length) {
			// If we've reached the end of the steps, navigate to "/hello" page
			// router.push('/hello')
			// Reset the step to 0 to start over if the user navigates back to this component
			setStep(0)
		} else {
			setStep(newStep % stepValues.length)
		}
	}

	const stepValues = ['GRRRRR', 'ROOOOWWllll', 'I am the ferroooccioouus', 'Worry Monster!']

	return (
		<VStack variant='page' flex={1} alignItems='center'>
			<TouchableOpacity onPress={updateStep}>
				<Heading fontSize={'3xl'} color={'white'}>
					{stepValues[step]}
				</Heading>
			</TouchableOpacity>
		</VStack>
	)
}
