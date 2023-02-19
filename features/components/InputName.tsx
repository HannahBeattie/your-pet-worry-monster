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
		<VStack justifyContent={'space-between'} flex={1} alignItems={'stretch'} space={8}>
			<Heading color={'white'}>Hmm... What should I call myself?</Heading>

			<Box alignItems='center'>
				<Input
					fontSize={'lg'}
					w='full'
					variant='outline'
					onChangeText={handleChange}
					value={value}
					placeholder='my name is'
					color={'black'}
					bg={'warmGray.200'}
					fontWeight={'800'}
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
			<Spacer />
			<Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
			<Spacer />
			<HStack justifyContent={'flex-end'} alignItems={'stretch'}>
				<Button
					variant={'ghost'}
					rounded='md'
					onPress={() => {
						dispatch(setName('No-name'))
					}}
				>
					SKIP
				</Button>
			</HStack>
		</VStack>
	)
}

export default InputName
