import { useRouter } from 'expo-router'
import { Heading, HStack, Image, ScrollView, Spacer, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import CurrentContent from '~features/worries/CurrentContent'
import { selectAllActive } from '~features/worries/worrySlice'

const gummyBoo = require('../assets/gummyBoo.png')
const top = require('../assets/top.png')
const drk = require('../assets/drk.jpg')
const aspectTop = 1500 / 326
const aspectBottom = 980 / 221

function Current() {
	const monsterName = useSelector(monsterNameSelector)
	const { height, width } = useWindowDimensions()
	const current = useSelector(selectAllActive)
	const [hasWorries, setHasWorries] = useState(false)
	useEffect(() => {
		setHasWorries(Boolean(current.length))
	}, [current, monsterName])

	const router = useRouter()
	const handleClose = React.useCallback(() => {
		router.push('/')
	}, [router])
	return (
		<ImageBackground source={drk} style={{ flex: 1 }}>
			<HStack zIndex={3} mt={10} position={'absolute'}>
				<Spacer />
				<CircleIconButton
					color='gray.400'
					size={'lg'}
					tag='exit'
					arealabel='exit'
					handlePress={handleClose}
				/>
			</HStack>
			<VStack
				position={'absolute'}
				top={0}
				left={0}
				right={0}
				height={width / aspectTop}
				zIndex={2}
				pointerEvents='none'
			>
				<Image flex={1} resizeMode='contain' source={top} alt={'teeth'} />
			</VStack>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView
					style={{ flex: 1, backgroundColor: 'transparent' }}
					showsVerticalScrollIndicator={false}
					overflowY={'revert-layer'}
				>
					<VStack alignItems={'center'} my={16}>
						<VStack space={2}>
							<Heading textAlign={'center'} fontFamily={'poppins'} opacity={80}>
								{hasWorries ? `Current Worries` : ` `}
							</Heading>
							<Text fontSize={'sm'} opacity={70} textAlign={'center'} px={10} pb={4}>
								Swipe worry right to feed {monsterName}
							</Text>
							<CurrentContent />
						</VStack>
					</VStack>
				</ScrollView>
			</SafeAreaView>

			<VStack
				maxW={width}
				position={'absolute'}
				bottom={0}
				left={0}
				right={0}
				height={width / aspectBottom}
				zIndex={2}
				pointerEvents='none'
			>
				<Image resizeMode='contain' source={gummyBoo} alt={'teeth'} flex={1} />
			</VStack>
		</ImageBackground>
	)
}

export default Current
