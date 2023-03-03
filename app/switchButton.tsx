import { Heading, VStack } from 'native-base'
import React from 'react'
import { Switch } from 'native-base'

import PageWrapper from '~features/styledComponents/PageWrapper'

function SwitchButton() {
	return (
		<PageWrapper>
			<Heading>Switch me on!</Heading>
			<Switch
				offTrackColor='orange.100'
				onTrackColor='orange.200'
				onThumbColor='orange.500'
				offThumbColor='orange.50'
			/>
		</PageWrapper>
	)
}

export default Switch
