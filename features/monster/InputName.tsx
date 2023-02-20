import { Box, Button, Heading, HStack, Image, Input, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { monsterNameSelector, setName } from '~features/monster/monsterSlice'

function InputName() {
	const [value, setValue] = React.useState('')
	const handleChange = (value: string) => setValue(value)
	const dispatch = useDispatch()
	const gregoryBlue = require('../../assets/blue.png')

	return (
		<VStack flex={1} space={8} pt={8}>
			<Heading color={'white'}>Hmm... What should I call myself?</Heading>
			<Box alignItems='center'>
				<Input
					fontSize={'lg'}
					w='full'
					variant='outline'
					onChangeText={handleChange}
					value={value}
					placeholder='my name is'
					fontWeight={'800'}
					color={'white'}
					InputRightElement={
						<Button
							h='full'
							bgColor={'gray.900'}
							rounded='none'
							onPress={() => {
								// console.log('Trying to set name...', setName(value))
								dispatch(setName(value))
							}}
						>
							<HStack>
								<Text color={'white'} fontWeight={'800'}>
									SAVE NAME
								</Text>
							</HStack>
						</Button>
					}
				/>
			</Box>
			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
		</VStack>
	)
}

export default InputName
