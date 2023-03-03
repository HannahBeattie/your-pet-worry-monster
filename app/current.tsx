import { Heading, ScrollView, VStack } from 'native-base'
import React from 'react'
import ExitPage from '~features/styledComponents/ExitPage'
import PageWrapper from '~features/styledComponents/PageWrapper'
import CurrentContent from '~features/worries/CurrentContent'

function Current() {
	return (
		<PageWrapper>
			<ExitPage />
			<ScrollView style={{ flex: 1 }}>
				<Heading textAlign={'center'} fontFamily={'poppins'}>
					Current Worries
				</Heading>
				<CurrentContent />
			</ScrollView>
		</PageWrapper>
	)
}

export default Current
