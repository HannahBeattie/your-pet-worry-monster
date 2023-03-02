import { Poppins_300Light } from '@expo-google-fonts/poppins'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Center,
	Container,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React from 'react'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DragExpander from '~features/experiments/DragExpander'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { useFormatDate } from './useFormatDate'
import { deleteWorry, selectLastActiveItem, updateWorry } from './worrySlice'

const hang = require('../../assets/hang.png')

function WorryOptions() {
	const router = useRouter()
	const dispatch = useDispatch()
	const latestActive = useSelector(selectLastActiveItem)
	const { width } = useWindowDimensions()

	const textProps = {
		fontFamily: 'poppinsLight',
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
			<PageWrapper>
				<Spacer />
				<Center>
					{latestActive && (
						<DragExpander
							px={4}
							space={2}
							onDelete={() => {
								dispatch(deleteWorry(latestActive.id))
								router.push('/')
							}}
							header={
								<VStack space={2}>
									<Text
										{...textProps}
										fontFamily={'poppinsLight'}
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
				<VStack mx={-4} pb={4} mb={4} mt={4}>
					<Text px={10} fontFamily={'monsterBold'} fontSize={'3xl'} color={'violet.400'}>
						Should I gobble this worry up or save it for later ?
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
			</PageWrapper>
		</VStack>
	)
}

export default WorryOptions
