// import { checkTargetForNewValues } from 'framer-motion'
import { Divider, Heading, Input, KeyboardAvoidingView, Text, TextArea, VStack } from 'native-base'
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import { Keyboard, TextInput, TouchableWithoutFeedback, useWindowDimensions } from 'react-native'
// import HomeButton from '~features/layout/HomeButton'
// import Page from '~features/layout/Page'
// import Textarea from 'react-expanding-textarea'
import InputWorry from '~features/worries/InputWorry'

export default function AddWorry() {
	// const textareaRef = useRef<typeof TextArea>(null)
	const textareaRef = useRef<TextInput>(null)

	const handleChange = useCallback((text: string) => {
		console.log('Changed value to: ', text)
	}, [])

	useEffect(() => {
		if (textareaRef.current === null) {
			return
		}
		// ;(window as any).ta = textareaRef.current
		textareaRef.current.focus()
	}, [textareaRef])

	const { height, width } = useWindowDimensions()
	return (
		<KeyboardAvoidingView flex={1}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<VStack variant={'form'}>
					<Heading color={'black'}>What are you feeling Worried About?</Heading>
					<Input
						defaultValue='Lorem ipsum dolor sit amet, ...'
						onChangeText={handleChange}
						placeholder='Enter additional notes...'
						ref={textareaRef}
						multiline
						size='2xl'
						fontSize='2xl'
						fontFamily='Poppins_800ExtraBold'
						// className='textarea'
						// autoCompleteType
						// id='my-textarea'
						// maxLength="3000"
						// name='pet[notes]'
						// totalLines={1}
					/>
					<Divider />
				</VStack>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}
