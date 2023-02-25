import { VStack } from 'native-base'
import React from 'react'
import MyFab from '~features/layout/MyFab'
import Bounce from './bounce'

function index() {
	return (
		<VStack variant={'page'}>
			<Bounce />
		</VStack>
	)
}

export default index
