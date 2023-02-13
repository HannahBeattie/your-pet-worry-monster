import { InputRightElement } from '@chakra-ui/react'
import { Box, Button, Heading, Input, InputGroup, VStack } from 'native-base'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector, setName } from '~features/monster/monsterSlice'

function InputName() {
	const [value, setValue] = React.useState('')
	const handleChange = (text) => setValue(text)
	const dispatch = useDispatch()
	const monsterName = useSelector(monsterNameSelector)
	return (
		<VStack space={8} flex={1}>
			<Heading color={'white'}>Hmm... What should I call myself?</Heading>

			<Box alignItems='center'>
				<Input
					color={'white'}
					placeholderTextColor={'blue'}
					fontSize={'lg'}
					w='100%'
					py='0'
					onChangeText={handleChange}
					value={value}
					InputRightElement={
						<Button
							size='md'
							rounded='none'
							w='1/3'
							h='full'
							onPress={() => {
								console.log('Trying to set name...', setName(value))
								dispatch(setName('Gregory'))
							}}
						>
							save
						</Button>
					}
					placeholder='my name is'
				/>
			</Box>

			<Heading color={'white'}>My name is {monsterName}</Heading>
		</VStack>
	)
}

export default InputName
