import { useRouter } from 'expo-router'
import { Heading, HStack, Image, ScrollView, Spacer, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import ExitPage from '~features/styledComponents/ExitPage'
import CurrentContent from '~features/worries/CurrentContent'
import { selectAllActive } from '~features/worries/worrySlice'

const arm = require('../assets/arm.png')
const gummyBoo = require('../assets/gummyBoo.png')
const top = require('../assets/top.png')
const drk = require('../assets/drk.jpg')

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
			<VStack position={'absolute'} top={-100} left={0} right={0} zIndex={2}>
				<Image resizeMode='contain' source={top} alt={'teeth'} />
			</VStack>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView
					style={{ flex: 1, backgroundColor: 'transparent' }}
					showsVerticalScrollIndicator={false}
					overflowY={'revert-layer'}
				>
					<VStack alignItems={'center'} pt={90} pb={100}>
						<VStack space={2}>
							<Heading textAlign={'center'} fontFamily={'poppins'} opacity={80}>
								{hasWorries ? `Current Worries` : ` `}
							</Heading>
							<Text fontSize={'sm'} opacity={70} textAlign={'center'} px={10}>
								{hasWorries ? `Swipe worry right to feed ${monsterName}` : ``}
							</Text>
							<CurrentContent />
						</VStack>
					</VStack>
				</ScrollView>
			</SafeAreaView>

			<VStack
				maxW={width}
				margin={0}
				padding={0}
				position={'absolute'}
				bottom={-70}
				zIndex={2}
			>
				<Image
					opacity={90}
					padding={0}
					resizeMode='contain'
					source={gummyBoo}
					alt={'teeth'}
				/>
			</VStack>
		</ImageBackground>
	)
}

export default Current
