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
			{/* <Gregory /> */}
			{/* <DragExpander
				expanded={
					<Text p={8}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</Text>
				}
			>
				<Heading alignSelf='center'>Hello</Heading>
			</DragExpander>  */}
			<WorryFeature />
		</VStack>
	)
}
