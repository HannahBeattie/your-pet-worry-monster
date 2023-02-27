import { VStack } from 'native-base'
import React from 'react'
import Page from '~features/layout/Page'
import Gregory from '~features/monster/Gregory'
import AccordionView from '~features/worries/AccordianView'

export default function Home() {
	return (
		<Page>
			<Gregory />
		</Page>
	)
}
