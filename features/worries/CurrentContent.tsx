import { useRouter } from 'expo-router'
import { Center, Text, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SwipeableButton from '~features/styledComponents/SwipableButton'
import { useFormatDate } from '~features/worries/useFormatDate'
import { Worry, selectAllActive, updateWorry } from '~features/worries/worrySlice'

export default function CurrentContent() {
	const allActive: Worry[] = [...useSelector(selectAllActive)].reverse()
	const dispatch = useDispatch()
	const router = useRouter()

	const handleSwipe = (worryId: number) => {
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
	}

	const { width } = useWindowDimensions()
	const w = width - 60
	return (
		<>
			{allActive.map((worry) => (
				<VStack key={worry.id} py={2}>
					<SwipeableButton onSwipe={() => handleSwipe(worry.id)}>
						<VStack pt={3}>
							<Center
								backgroundColor={'#0e0e0e'}
								justifyItems={'center'}
								justifyContent={'center'}
								borderColor={'#ffffff14'}
								borderWidth={1}
								py={8}
								px={8}
								width={w}
								borderRadius={'md'}
								alignItems={'stretch'}
							>
								<Text fontSize={'md'} color={'gray.400'}>
									I started worrying {useFormatDate(worry.id)} {worry.description}
								</Text>
								{worry.extraNote && (
									<>
										<Text fontSize={'sm'} color={'gray.400'} pt={4}>
											The scariest bit is{worry.extraNote}
										</Text>
									</>
								)}
							</Center>
						</VStack>
					</SwipeableButton>
				</VStack>
			))}
		</>
	)
}
