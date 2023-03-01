import { Tab } from '@chakra-ui/react'
import { useRouter } from 'expo-router'
import { Button, Divider, Heading, HStack, Image, Spacer, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DragExpander from '~features/experiments/DragExpander'
import Blue from '~features/monster/Blue'
import { useFormatDate } from './useFormatDate'
import {
	deleteWorry,
	selectAllActive,
	selectLastActiveItem,
	updateWorry,
	Worry,
} from './worrySlice'
const worryBags = require('../../assets/worrybags.png')
const blueFace = require('../../assets/blueFace.png')
const hang = require('../../assets/hang.png')

function WorryOptions() {
	const router = useRouter()
	const dispatch = useDispatch()
	const latestActive = useSelector(selectLastActiveItem)
	const { width, height } = useWindowDimensions()

	const textProps = {
		fontFamily: 'Poppins_300Light',
		color: 'white',
		fontSize: 'sm',
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
		<VStack flex={1} backgroundColor={'gray.900'}>
			<HStack maxW={width}>
				<Spacer />
				<Image
					flex={1}
					height={250}
					resizeMode='contain'
					alt={'hanging blue face'}
					source={hang}
				/>
			</HStack>

			<SafeAreaView style={{ flex: 1 }}>
				<VStack flex={1} px={4} justifyContent={'space-evenly'}>
					{latestActive && (
						<DragExpander
							onDelete={() => {
								dispatch(deleteWorry(latestActive.id))
								router.push('/')
							}}
							backgroundColor={'black'}
							borderRadius={'lg'}
							px={4}
							py={2}
							borderColor={'red.600'}
							borderWidth={0.5}
							header={
								<VStack space={2}>
									<Text
										{...textProps}
										fontFamily={'Poppins_500Medium'}
										color={'red.300'}
									>
										{useFormatDate(latestActive?.id)}
									</Text>
									<Text {...textProps}>
										I am worried {latestActive?.description}
									</Text>
								</VStack>
							}
						>
							<VStack py={2}>
								<Text {...textProps}>{latestActive?.extraNote}</Text>
								<Text {...textProps}>{latestActive?.sensation}</Text>
							</VStack>
						</DragExpander>
					)}

					<VStack space={4}>
						<Text fontFamily={'Poppins_500Medium'} fontSize={'md'} px={4}>
							Wouly you like me to hold on to this worry for a bit?
						</Text>
						<Button
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
							bg={'#ffffff'}
							py={4}
							px={8}
						>
							<Text
								{...textProps}
								textAlign={'center'}
								color={'black'}
								fontSize={'md'}
								fontFamily={'Poppins_500Medium'}
								fontWeight={600}
								borderRadius={0}
							>
								No thank you. I am ready to part with this worry .
							</Text>
						</Button>

						<Button
							onPress={() => {
								router.push('/current')
							}}
							bg={'black'}
							py={4}
							px={8}
							borderWidth={1}
							borderColor={'blueGray.700'}
						>
							<Text
								textAlign={'center'}
								color={'white'}
								fontSize={'md'}
								fontWeight={600}
								fontFamily={'Poppins_500Medium'}
							>
								Yes Please.
							</Text>
						</Button>
					</VStack>
				</VStack>
			</SafeAreaView>
		</VStack>
	)
}

export default WorryOptions
