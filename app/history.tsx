import React from 'react'
import HomeButton from '~features/layout/HomeButton'
import Page from '~features/layout/Page'
import YouHaveWorried from '~features/worries/YouHaveWorried'

export default function history() {
	return (
		<Page>
			<YouHaveWorried />
			<HomeButton />
		</Page>
	)
}
