import { useRouter } from 'expo-router'
import { Button, Heading } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import Page from '~features/layout/Page'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import YouHaveWorried from '~features/worries/YouHaveWorried'

export default function history() {
	const name = useSelector(monsterNameSelector)
	const router = useRouter()
	return (
		<Page>
			<YouHaveWorried />
			<Button
				onPress={() => {
					router.push('/monsterMenu')
				}}
			>
				<Heading>Back to {name}</Heading>
			</Button>
		</Page>
	)
}
