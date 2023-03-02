import {
	Box,
	Button,
	Center,
	Fab,
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
import HomeButton from '~features/layout/HomeButton'
import MyFab from '~features/layout/MyFab'
import Blue from '~features/monster/Blue'
import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, useWindowDimensions } from 'react-native'
import { useRouter } from 'expo-router'
import SimpleHome from '~features/layout/SimpleHome'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { selectAllActive } from '~features/worries/worrySlice'

const yummy = require('../assets/yummy.png')

export default function EatingWorry() {
	const { width } = useWindowDimensions()
	const router = useRouter()
	const active = useSelector(selectAllActive)
	return (
		<VStack backgroundColor={'gray.900'} flex={1}>
			<SafeAreaView style={{ flex: 1 }}>
				<VStack pt={4}>
					<Heading fontSize={'6xl'} textAlign={'center'} fontFamily={'mono'}>
						YUMMMM!
					</Heading>
					<Heading textAlign={'center'} fontFamily={'mono'}>
						That Was delicious!
					</Heading>

					<Heading textAlign={'center'} fontFamily={'mono'}>
						Give me more!
					</Heading>
				</VStack>
				<VStack flex={1} px={4}>
					<Image alt={'blue the monster'} source={yummy} flex={1} resizeMode='contain' />
				</VStack>

				<HStack justifyContent={'space-evenly'} px={50}>
					{active.length > 0 && (
						<VStack>
							<IconButton
								onPress={() => {
									router.push('current')
								}}
								icon={
									<Icon
										size={'5xl'}
										as={MaterialCommunityIcons}
										name={'food-drumstick'}
									/>
								}
							/>
							<Heading fontSize={'sm'} textAlign={'center'}>
								Eat
							</Heading>
						</VStack>
					)}
					<VStack>
						<IconButton
							onPress={() => {
								router.push('/addWorry')
							}}
							icon={<Icon size={'5xl'} as={Ionicons} name={'add-circle-sharp'} />}
						/>
						<Heading fontSize={'sm'} textAlign={'center'}>
							Add
						</Heading>
					</VStack>
					<VStack>
						<IconButton
							onPress={() => {
								router.push('/')
							}}
							icon={<Icon size={'5xl'} as={Fontisto} name={'home'} />}
						/>
						<Heading fontSize={'sm'} textAlign={'center'}>
							Home
						</Heading>
					</VStack>
				</HStack>
			</SafeAreaView>
		</VStack>
	)
}
