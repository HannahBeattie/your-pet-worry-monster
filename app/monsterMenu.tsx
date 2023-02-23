import { useRouter } from 'expo-router'
import { VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import Page from '~features/layout/Page'
import Blue from '~features/monster/Blue'
import Gregory from '~features/monster/Gregory'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import Options from '~features/monster/Options'

export default function Home() {
	return (
		<Page>
			<Gregory />
		</Page>
	)
}
