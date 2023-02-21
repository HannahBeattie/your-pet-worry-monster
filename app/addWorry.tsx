import { Heading } from 'native-base'
import React from 'react'
import HomeButton from '~features/layout/HomeButton'
import Page from '~features/layout/Page'

import InputWorry from '~features/worries/InputWorry'

export default function AddWorry() {
	return (
		<Page>
			<InputWorry />
		</Page>
	)
}
