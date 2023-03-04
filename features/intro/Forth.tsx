import { useRouter } from 'expo-router'
import { Button, Center, HStack, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import CircleIconButton from '~features/styledComponents/CircleIconButton'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import { setIntroPlayed, setThirdPlayed } from './introSlice'
import SequentialText from './SequentialText'

function Forth() {
	const dispatch = useDispatch()
	const router = useRouter()
	const handleLast = () => {
		router.push('/add')
		dispatch(setIntroPlayed(true))
	}

	const introText = ['*gurgle gurgle*', 'I am hugnry!']
	return (
		<Center flex={1} px={8}>
			<SequentialText textArray={introText} handleLast={handleLast}>
				<VStack pt={4} pb={10}>
					<MonsterVoice>Any worries?</MonsterVoice>
				</VStack>
				<VStack flex={1} alignContent={'center'} justifyContent={'space-between'}>
					<HStack space={4}>
						<Button
							bg={'gray.900'}
							borderRadius={'md'}
							py={4}
							px={3}
							_pressed={{ backgroundColor: 'gray.200' }}
							onPress={() => {
								router.push('/')
								dispatch(setIntroPlayed(true))
							}}
						>
							<Text color={'gray.400'}>Maybe Later</Text>
						</Button>
						<Button
							bg={'gray.900'}
							borderRadius={'md'}
							py={4}
							px={3}
							_pressed={{ backgroundColor: 'gray.200' }}
							onPress={() => {
								router.push('/addWorry')
								dispatch(setIntroPlayed(true))
							}}
						>
							<Text color={'gray.200'}>Add worry</Text>
						</Button>
					</HStack>

					<FullBlue monsterMood='want' />
				</VStack>
			</SequentialText>
		</Center>
	)
}

export default Forth
