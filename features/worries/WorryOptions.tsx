import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Center, Heading, HStack, Icon, IconButton, Image, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DragExpander from '~features/experiments/DragExpander'
import { useFormatDate } from './useFormatDate'
import { deleteWorry, selectLastActiveItem, updateWorry } from './worrySlice'

const hang = require('../../assets/hang.png')

function WorryOptions() {
	const router = useRouter()
	const dispatch = useDispatch()
	const latestActive = useSelector(selectLastActiveItem)
	const { width } = useWindowDimensions()

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
				<VStack flex={1} px={4}>
					<Spacer />
					<Center>
						{latestActive && (
							<DragExpander
								px={4}
								backgroundColor={'gray.900'}
								borderRadius={'md'}
								onDelete={() => {
									dispatch(deleteWorry(latestActive.id))
									router.push('/')
								}}
								header={
									<VStack>
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
								<VStack>
									<Text {...textProps}>{latestActive?.extraNote}</Text>
									<Text {...textProps}>{latestActive?.sensation}</Text>
								</VStack>
							</DragExpander>
						)}
					</Center>
					<Spacer />
					<VStack mx={-4} py={2} pb={4} bg={'black'} mb={4} mt={4}>
						<Text {...textProps} px={10} fontSize={'xl'} color={'white'}>
							Should I gobble this worry up
						</Text>
						<Text {...textProps} px={10} fontSize={'xl'} color={'white'}>
							or save it for later ?
						</Text>
					</VStack>

					<HStack justifyContent={'space-evenly'} px={50}>
						<VStack>
							<IconButton
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
								icon={
									<Icon
										size={'5xl'}
										as={MaterialCommunityIcons}
										name={'food-drumstick'}
									/>
								}
							/>
							<VStack>
								<Heading fontSize={'sm'} textAlign={'center'}>
									Gobble
								</Heading>
							</VStack>
						</VStack>

						<VStack>
							<IconButton
								onPress={() => {
									router.push('/')
								}}
								icon={
									<Icon
										size={'5xl'}
										as={MaterialCommunityIcons}
										name={'food-drumstick-off'}
									/>
								}
							/>
							<Heading fontSize={'sm'} textAlign={'center'}>
								Save
							</Heading>
						</VStack>
					</HStack>
				</VStack>
			</SafeAreaView>
		</VStack>
	)
}

export default WorryOptions

{
	/* 						
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
						</Button> */
}
