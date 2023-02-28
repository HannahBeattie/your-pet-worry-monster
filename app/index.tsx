import { Heading, Text } from 'native-base'
import React from 'react'
import DragExpander from '~features/experiments/DragExpander'
import WorryFeature from '~features/experiments/WorryFeature'
import Page from '~features/layout/Page'
import Gregory from '~features/monster/Gregory'

export default function Home() {
	return (
		<>
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
		</>
	)
}
