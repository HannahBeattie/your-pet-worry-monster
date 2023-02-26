import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Box, Button, Center, Heading, HStack, Image, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { ImageBackground, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Blue from '~features/monster/Blue'
import {
	selectAllActive,
	selectLastActiveItem,
	updateWorry,
	Worry,
} from '~features/worries/worrySlice'

export default function SavingWorry() {
	const router = useRouter()
	const dispatch = useDispatch()
	const allActive: Array<Worry> = useSelector(selectAllActive)
	const latestActive = useSelector(selectLastActiveItem)
	console.log('latestActive is:', latestActive)

	const bg = require('../assets/spatter02.png')
	const worry = require('../assets/temp.png')

	return (
		<VStack
			backgroundColor={'gray.900'}
			justifyContent={'space-evenly'}
			flex={1}
			px={8}
			py={10}
		>
			<ImageBackground
				source={bg}
				style={styles.container}
				resizeMode='cover'
				style={styles.image}
			>
				<Center>
					<Text fontFamily={'Poppins_300Light'} color={'white'} fontSize={'md'}>
						I am worried about {latestActive?.description}
					</Text>
					<Text fontFamily={'Poppins_300Light'} color={'white'} fontSize={'md'}>
						The Scariest bit is {latestActive?.extraNote}
					</Text>
				</Center>
			</ImageBackground>
			<VStack space={8}>
				<Center px={4}>
					<Text fontFamily={'Poppins_300Light'} color={'white'} fontSize={'xl'}>
						Wouly you like me to hold on to this worry for a bit?
					</Text>
				</Center>
				<VStack space={4} px={4}>
					<TouchableOpacity
						onPress={() => {
							updateWorry({
								id: latestActive.id,
								changes: {
									isActive: !latestActive.isActive,
									consumedAt: +new Date(),
								},
							})
							router.push('/')
						}}
					>
						<Tag
							backgroundColor={'gray.100'}
							borderRadius={'sm'}
							borderWidth={2}
							borderColor={'gray.100'}
						>
							<VStack>
								<Text
									px={8}
									fontFamily='Poppins_400Regular'
									textAlign={'center'}
									color={'black'}
									fontSize={'lg'}
									fontWeight={600}
								>
									No thank-you,
								</Text>

								<Text
									px={8}
									fontFamily='Poppins_400Regular'
									textAlign={'center'}
									color={'black'}
									fontSize={'md'}
									fontWeight={600}
								>
									I am ready to part with this worry.
								</Text>
							</VStack>
						</Tag>
					</TouchableOpacity>

					<Box>
						<TouchableOpacity
							onPress={() => {
								router.push('/')
							}}
						>
							<Tag backgroundColor={'white'} borderRadius={'sm'}>
								<Text
									fontFamily='Poppins_400Regular'
									py={2}
									textAlign={'center'}
									color={'black'}
									fontSize={'md'}
									fontWeight={600}
									px={4}
								>
									Yes please.
								</Text>
							</Tag>
						</TouchableOpacity>
					</Box>
				</VStack>
			</VStack>
			{/* 
			<VStack space={2}>
				<Button
					bg={'blueGray.900'}
					borderRadius={'sm'}
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
					<Text
						fontFamily='Poppins_300Light'
						py={2}
						textAlign={'center'}
						color={'white'}
						fontSize={'lg'}
						fontWeight={600}
					>
						No thank you, I am ready to say goodbye to this worry.
					</Text>
				</Button>
				<Button
					borderRadius={'sm'}
					bg={'blueGray.900'}
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
					<Text
						fontFamily='Poppins_300Light'
						py={2}
						textAlign={'center'}
						color={'white'}
						fontSize={'lg'}
						fontWeight={600}
					>
						No thank you, I am ready to say goodbye to this worry.
					</Text>
				</Button>
			</VStack> */}
			{/* <Text>All Active: {allActive.map((worry: Worry) => worry.description).join(', ')}</Text> */}
		</VStack>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		maxHeight: 200,

		p: 10,
		justifyContent: 'center',
	},
})
