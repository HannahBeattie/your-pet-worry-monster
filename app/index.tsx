import { Box, Spacer, VStack } from 'native-base'
import React from 'react'
import MyFab from '~features/layout/MyFab'
import Gregory from '~features/monster/Gregory'
import Move from '~features/monster/Move'
import Bounce from './bounce'

function index() {
	return (
		<VStack variant={'page'}>
			<Gregory />
		</VStack>
	)
}

export default index
