import { useRouter } from 'expo-router'
import { Button, Center, HStack, Spacer, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import { setIntroPlayed, setThirdPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Forth() {
	const dispatch = useDispatch()
	const router = useRouter()
	const handleLast = () => {
		router.push('/add')
	}

	const introText = ['gurgle gurgle', 'I am hugnry!', 'Do you have any', 'worries?']
	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<VStack flex={1} alignContent={'center'} justifyContent={'space-between'} py={20}>
					<HStack space={4}>
						<Button
							onPress={() => {
								router.push('/maybeLater')
							}}
						>
							No worries
						</Button>
						<Button
							onPress={() => {
								router.push('/addWorry')
							}}
						>
							Add worry
						</Button>
					</HStack>

					<FullBlue monsterMood='want' />
				</VStack>
			</SequentialText>
		</Center>
	)
}

export default Forth
