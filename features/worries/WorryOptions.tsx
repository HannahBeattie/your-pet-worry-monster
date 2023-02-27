import { Tab } from '@chakra-ui/react'
import { useRouter } from 'expo-router'
import { Button, Divider, Heading, HStack, Spacer, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Blue from '~features/monster/Blue'
import { selectAllActive, selectLastActiveItem, updateWorry, Worry } from './worrySlice'

function WorryOptions() {
	const router = useRouter()
	const dispatch = useDispatch()
	const latestActive = useSelector(selectLastActiveItem)
	console.log('latestActive is:', latestActive)

	const textProps = {
		fontFamily: 'Poppins_300Light',
		color: 'white',
		fontSize: 'lg',
	}
	const buttonProps = {
		backgroundColor: '#151516',
		fontSize: 'lg',
		px: 4,
		py: 2,
		color: 'gray.200',
		borderRadius: 'md',
	}

	return (
		<VStack variant={'soft'} backgroundColor={'blueGray.200'}>
			<Text fontFamily={'Poppins_500Medium'} fontSize={'2xl'} px={4} color={'blueGray.700'}>
				Wouly you like me to hold on to this worry for a bit?
			</Text>
			<VStack backgroundColor={'blueGray.900'} px={4} borderRadius={'lg'} pb={8} pt={4}>
				{latestActive && (
					<Text {...textProps} fontSize={'lg'} pt={2}>
						I am worried about{' '}
						{latestActive?.description.length >= 50
							? latestActive?.description.slice(0, 50) + '...'
							: latestActive?.description}
					</Text>
				)}
				{latestActive?.extraNote && (
					<VStack pt={2}>
						<Text {...textProps} fontSize={'lg'} pt={2}>
							The scariest bit is{' '}
							{latestActive?.extraNote?.length >= 50
								? latestActive?.extraNote.slice(0, 50) + '...'
								: latestActive?.extraNote}
						</Text>
					</VStack>
				)}
			</VStack>
			<Divider />
			<Spacer />
			<VStack space={2}>
				<TouchableOpacity
					onPress={() => {
						router.push('/current')
					}}
				>
					<Tag {...buttonProps}>
						<Text {...textProps} {...buttonProps} fontFamily={'	Poppins_500Medium,'}>
							Yes Please.
						</Text>
					</Tag>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						dispatch(
							updateWorry({
								id: latestActive.id,
								changes: {
									isActive: !latestActive.isActive,
									consumedAt: +new Date(),
								},
							})
						),
							router.push('/eatingWorry')
					}}
				>
					<Tag {...buttonProps}>
						<VStack space={0} {...buttonProps}>
							<Text {...textProps}>No thank you,</Text>
							<Text {...textProps} fontFamily={'	Poppins_500Medium,'}>
								I am ready to say goodbye to this worry.
							</Text>
						</VStack>
					</Tag>
				</TouchableOpacity>
			</VStack>
			<Spacer />
		</VStack>
	)
}

export default WorryOptions
