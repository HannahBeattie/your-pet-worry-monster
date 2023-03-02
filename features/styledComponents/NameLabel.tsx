import { Box, Center, Tag, Text, VStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'

function NameLabel() {
	const monsterName = useSelector(monsterNameSelector)
	return (
		<>
			<Center mx={10} py={2} borderRadius={'sm'} opacity={80} backgroundColor={'#121212'}>
				<Text color={'gray.400'} fontSize={'md'} fontFamily={'read'}>
					{monsterName}
				</Text>
			</Center>
		</>
	)
}

export default NameLabel
