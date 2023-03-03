import { Heading, Input, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import DragExpander from '~features/experiments/DragExpander'
import WorryFeature from '~features/experiments/WorryFeature'
import Page from '~features/styledComponents/Page'
import Gregory from '~features/monster/Gregory'
import InputYourWorry from '~features/worries/InputYourWorry'
import PageWrapper from '~features/styledComponents/PageWrapper'

export default function Home() {
	return (
		<PageWrapper>
			<Gregory />
		</PageWrapper>
	)
}
