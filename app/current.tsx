import { Center, Container, Heading, ScrollView, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import ExitPage from '~features/styledComponents/ExitPage'
import PageWrapper from '~features/styledComponents/PageWrapper'
import CurrentContent from '~features/worries/CurrentContent'

function Current() {
	const monsterName = useSelector(monsterNameSelector)
	return (
		<VStack flex={1} backgroundColor={'gray.900'}>
			<ScrollView
				style={{ flex: 1 }}
				z-zIndex={1}
				overflow={'visible'}
				showsHorizontalScrollIndicator={false}
			>
				<Center flex={1} backgroundColor={'gray.900'} py={8}>
					<ExitPage />

					<VStack space={4}>
						<Heading textAlign={'center'} fontFamily={'poppins'} opacity={80}>
							Current Worries
						</Heading>

						<Container pb={10}>
							<Text fontSize={'sm'} opacity={70}>
								that {monsterName} promises not to eat without permission.
							</Text>
						</Container>
					</VStack>

					<CurrentContent />
				</Center>
			</ScrollView>
		</VStack>
	)
}

export default Current
