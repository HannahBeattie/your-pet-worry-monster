import { useRouter } from 'expo-router'
import { Heading, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import { selectAllActive, Worry } from '~features/worries/worrySlice'

// onPress={() => {
// 	dispatch(
// 		updateWorry({
// 			id: item.id,
// 			changes: {
// 				isActive: !item.isActive,
// 				consumedAt: +new Date(),
// 			},
// 		})
// 	),
// 		router.push('/eatingWorry')
// }}

export default function Slide() {
	const allActive: Worry[] = [...useSelector(selectAllActive)].reverse()
	const dispatch = useDispatch()
	const name = useSelector(monsterNameSelector)
	const { height } = useWindowDimensions()
	const router = useRouter()
	return (
		<VStack flex={1} backgroundColor={'gray.900'}>
			<SafeAreaView>
				<Heading p={8}>Hello </Heading>
				<CircleIconButton
					name='food-drumstick-off'
					label='Check'
					arealabel='Check Button'
				/>
			</SafeAreaView>
		</VStack>
	)
}
