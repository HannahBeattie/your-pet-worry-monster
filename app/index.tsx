import { Heading, Input, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import DragExpander from '~features/experiments/DragExpander'
import WorryFeature from '~features/experiments/WorryFeature'
import Page from '~features/styledComponents/Page'
import Gregory from '~features/monster/Gregory'
import InputYourWorry from '~features/worries/InputYourWorry'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { useSelector } from 'react-redux'
import { introStateSelector } from '~features/intro/introSlice'
import Intro from '~features/intro/Intro'

export default function Home() {
	const introPlayed = useSelector(introStateSelector)
	return (
		<PageWrapper>
			{!introPlayed && <Intro />}
			{introPlayed && <Gregory />}
		</PageWrapper>
	)
}
