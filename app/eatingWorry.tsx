import { Heading, VStack } from 'native-base'
import React from 'react'
import HomeButton from '~features/layout/HomeButton'

export default function EatingWorry() {
	return (
		<VStack variant={'page'}>
			<Heading>Eating</Heading>
			<HomeButton />
		</VStack>
	)
}
