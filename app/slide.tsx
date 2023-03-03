import { ScrollView } from 'native-base'
import React from 'react'
import ExitPage from '~features/styledComponents/ExitPage'
import PageWrapper from '~features/styledComponents/PageWrapper'
import CurrentContent from '~features/worries/CurrentContent'

export default function Slide() {
	return (
		<PageWrapper>
			<ExitPage />
			<ScrollView style={{ flex: 1 }}>
				<CurrentContent />
			</ScrollView>
		</PageWrapper>
	)
}
