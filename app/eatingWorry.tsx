import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Center, Heading, HStack, Icon, IconButton, VStack } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import PageWrapper from '~features/styledComponents/PageWrapper'
import { selectAllActive } from '~features/worries/worrySlice'

export default function EatingWorry() {
	const { width } = useWindowDimensions()
	const router = useRouter()
	const active = useSelector(selectAllActive)
	return (
		<PageWrapper>
			<Center>
				<MonsterVoice sizeVal={'5xl'}> YUMMMM!</MonsterVoice>
				<MonsterVoice> That Was delicious!!</MonsterVoice>
				<MonsterVoice> Give me more!</MonsterVoice>
			</Center>
			<FullBlue monsterMood={'yummy'} />

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
		</PageWrapper>
	)
}
