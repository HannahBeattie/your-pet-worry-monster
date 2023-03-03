import { Box, Center, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import MonsterVoice from './MonsterVoice'

function NameLabel() {
	const monsterName = useSelector(monsterNameSelector)
	return (
		<>
			<Center mb={0}>
				<MonsterVoice>{monsterName}</MonsterVoice>
			</Center>
		</>
	)
}

export default NameLabel
