import { Heading, Input, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import DragExpander from '~features/experiments/DragExpander'
import WorryFeature from '~features/experiments/WorryFeature'
import Page from '~features/layout/Page'
import Gregory from '~features/monster/Gregory'
import InputYourWorry from '~features/worries/InputYourWorry'

export default function Home() {
	return (
		<VStack backgroundColor={'gray.900'} flex={1}>
			<SafeAreaView style={{ flex: 1 }}>
				<VStack px={6} backgroundColor={'gray.900'} flex={1}>
					<Gregory />
				</VStack>
			</SafeAreaView>
		</VStack>
	)
}
