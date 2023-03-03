import { useRouter } from 'expo-router'
import { Center, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import SwipeableButton from '~features/styledComponents/SwipableButton'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllActive, updateWorry, Worry } from '~features/worries/worrySlice'

export default function CurrentContent() {
	const allActive: Worry[] = [...useSelector(selectAllActive)].reverse()
	const dispatch = useDispatch()
	const name = useSelector(monsterNameSelector)
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const [text, setText] = useState(`Slide to feed ${name}`)

	const handleSwipe = (worryId: number) => {
		setIsLoading(true)
		dispatch(
			updateWorry({
				id: worryId,
				changes: {
					isActive: false,
					consumedAt: +new Date(),
				},
			})
		)
		router.push('eatingWorry')
		console.log('ate worry: ', worryId)
		setIsLoading(false)
	}

	const { width, height } = useWindowDimensions()
	const w = width - 48
	return (
		<>
			<VStack py={10}>
				{allActive.map((worry) => (
					<VStack key={worry.id}>
						<SwipeableButton
							text={text}
							onSwipe={() => handleSwipe(worry.id)}
							isLoading={isLoading}
						>
							<VStack pt={3}>
								<Center
									backgroundColor={'#111111a0'}
									justifyItems={'center'}
									justifyContent={'center'}
									borderColor={'#ffffff14'}
									borderWidth={1}
									py={8}
									px={8}
									width={w}
									borderBottomRadius={'md'}
								>
									<Text fontSize={'md'} color={'gray.400'}>
										I started worrying {useFormatDate(worry.id)}{' '}
										{worry.description}
									</Text>
								</Center>
							</VStack>
						</SwipeableButton>
					</VStack>
				))}
			</VStack>
		</>
	)
}
