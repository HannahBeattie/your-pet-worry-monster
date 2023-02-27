import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Button,
	Heading,
	Spacer,
	Text,
	VStack,
	ScrollView,
	Center,
	Divider,
	HStack,
} from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import HomeButton from '~features/layout/HomeButton'
import Scroll from '~features/layout/Scroll'
import SimpleHome from '~features/layout/SimpleHome'
import Blue from '~features/monster/Blue'
import Gregory from '~features/monster/Gregory'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllActive, updateWorry } from '~features/worries/worrySlice'

export default function Current() {
	const allActive = useSelector(selectAllActive).reverse()
	const dispatch = useDispatch()

	const router = useRouter()
	const font = { fontFamily: 'Poppins_300Light', color: 'black' }
	return (
		<>
			<ScrollView
				backgroundColor={'gray.100'}
				flex={1}
				contentContainerStyle={{
					alignItems: 'stretch',
					justifyContent: 'flex-start',
					minHeight: '100%',
					marginStart: '0',
					backgroundColor: 'blue.300',
				}}
			>
				<VStack flex={1} pb={10} pt={90} px={8} alignItems={'stretch'}>
					<Center>
						<Heading {...font} color={'black'} fontSize={'4xl'}>
							Curent Worries
						</Heading>
					</Center>
					<Spacer />
					{allActive.map((worry) => (
						<VStack
							my={4}
							key={worry.id}
							backgroundColor={'gray.200'}
							borderRadius={'sm'}
							alignItems={'stretch'}
						>
							<VStack px={0}>
								<Button
									flex={1}
									px={0}
									backgroundColor={'gray.900'}
									borderTopRadius={'sm'}
									borderBottomRadius={'0'}
									onPress={() => {
										dispatch(
											updateWorry({
												id: worry.id,
												changes: {
													isActive: !worry.isActive,
													consumedAt: +new Date(),
												},
											})
										),
											router.push('/eatingWorry')
									}}
								>
									<HStack flex={1} alignItems={'stretch'}>
										<Entypo name='circle-with-cross' size={24} color='white' />
										<Spacer />
										<Text {...font} fontSize={'md'} px={8} color='white'>
											Say goodye to this worry!
										</Text>
									</HStack>
								</Button>
							</VStack>
							<VStack px={4} py={4}>
								<Text {...font} fontSize={'md'} color={'red.800'}>
									{useFormatDate(worry.id)}
								</Text>

								<Text {...font}>{worry.description}</Text>
								<Divider />
								<Text {...font}>{worry.extraNote}</Text>
							</VStack>
						</VStack>
					))}
					<Spacer />
					<SimpleHome />
				</VStack>
			</ScrollView>
		</>
	)
}
