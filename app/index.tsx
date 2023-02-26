import { VStack } from 'native-base'
import React from 'react'
import MyFab from '~features/layout/MyFab'
import Move from '~features/monster/Move'
import Bounce from './bounce'

function index() {
	return (
		<VStack variant={'page'}>
			{/* <Bounce /> */}
			<Move />
		</VStack>
	)
}

export default index
