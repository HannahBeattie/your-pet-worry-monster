import { current } from 'immer'
import { Center, Container, Heading, Image, ScrollView, Spacer, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import ExitPage from '~features/styledComponents/ExitPage'
import CurrentContent from '~features/worries/CurrentContent'
import { selectAllActive } from '~features/worries/worrySlice'

const arm = require('../assets/arm.png')

function Current() {
	const monsterName = useSelector(monsterNameSelector)
	const { height } = useWindowDimensions()
	const current = useSelector(selectAllActive)
	const [hasWorries, setHasWorries] = useState(false)
	useEffect(() => {
		setHasWorries(Boolean(current.length))
	}, [current, monsterName])

	return (
		<VStack flex={1} backgroundColor={'gray.900'}>
			<ScrollView
				style={{ flex: 1 }}
				z-zIndex={1}
				overflow={'visible'}
				showsHorizontalScrollIndicator={false}
				mb={0}
				pb={0}
			>
				<VStack backgroundColor={'gray.900'} pt={8} alignItems={'center'}>
					<ExitPage />

					<VStack space={4}>
						<Heading textAlign={'center'} fontFamily={'poppins'} opacity={80}>
							{hasWorries ? `Current Worries` : `No Worries`}
						</Heading>

						<Container pb={10}>
							<Text fontSize={'sm'} opacity={70}>
								{hasWorries
									? `that ${monsterName} promises not to eat without permission.`
									: `${monsterName} has no worries.`}
							</Text>
						</Container>
					</VStack>
					<CurrentContent />
					{hasWorries && (
						<Center h={500}>
							<FullBlue monsterMood='sneak' />
						</Center>
					)}
					{!hasWorries && (
						<VStack position={'absolute'} top={200} right={-60} opacity={50}>
							<Image resizeMode='contain' h={300} source={arm} alt={'arm'} />
						</VStack>
					)}
				</VStack>
				<Spacer />
			</ScrollView>
		</VStack>
	)
}

export default Current
