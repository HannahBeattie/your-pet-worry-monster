import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Center, Icon, IconButton, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SwipeableButton from '~features/styledComponents/SwipableButton'
import { useFormatDate } from '~features/worries/useFormatDate'
import { Worry, selectAllActive, updateWorry, deleteWorry } from '~features/worries/worrySlice'

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

	const handleTrash = (worryId: number) => {
		dispatch(deleteWorry(worryId))
		console.log('deleted worry: ', worryId)
	}

	const { width } = useWindowDimensions()
	const w = width - 60
	return (
		<>
			{allActive.map((worry) => (
				<VStack py={2} key={worry.id}>
					<SwipeableButton
						onSwipe={() => handleSwipe(worry.id)}
						onBin={() => handleTrash(worry.id)}
					>
						<VStack pt={3}>
							<Center
								justifyItems={'center'}
								justifyContent={'center'}
								alignItems={'stretch'}
								py={6}
								px={6}
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
