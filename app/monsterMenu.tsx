import { VStack } from 'native-base'
import React from 'react'
import Page from '~features/layout/Page'
import Gregory from '~features/monster/Gregory'
import Options from '~features/monster/Options'

export default function Home() {
	return (
		<Page>
			<Options />
		</Page>
	)
}
