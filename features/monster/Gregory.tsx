import { VStack } from 'native-base'
import React from 'react'
import FloatingButton from '~features/styledComponents/MyFab'
import NameLabel from '~features/styledComponents/NameLabel'

import Blue from './Blue'

function Gregory() {
	return (
		<VStack alignItems={'stretch'} flex={'1'} pt={4}>
			<NameLabel />
			<Blue />
			<FloatingButton />
		</VStack>
	)
}

export default Gregory
