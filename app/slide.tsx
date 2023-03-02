import { VStack, Heading, Text } from 'native-base'
import React from 'react'
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native'
import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllActive, updateWorry, Worry } from '~features/worries/worrySlice'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { useRouter } from 'expo-router'

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
				<Text variant={'blueVoice'}>Test</Text>
			</SafeAreaView>
		</VStack>
	)
}
