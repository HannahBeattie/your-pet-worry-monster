import { VStack } from 'native-base'
import React from 'react'
import Page from '~features/layout/Page'
import Gregory from '~features/monster/Gregory'
import Warn from '~features/worries/Warn'

export default function Home() {
	return (
		<Page>
			<Gregory />
		</Page>
	)
}
