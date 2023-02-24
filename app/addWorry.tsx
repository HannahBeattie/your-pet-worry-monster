// import { checkTargetForNewValues } from 'framer-motion'
import { Feather } from '@expo/vector-icons'
import { Divider, Heading, HStack, Input, KeyboardAvoidingView, Spacer, VStack } from 'native-base'
import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import HomeButton from '~features/layout/HomeButton'

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
		<KeyboardAvoidingView behavior='padding' style={styles.form}>
			<VStack space={4}>
				<Heading fontFamily='Poppins_300Light' color={'black'}>
					I am feeling worried because...
				</Heading>

				<Input
					onChangeText={handleChange}
					ref={textareaRef}
					multiline
					color={'blueGray.900'}
					placeholderTextColor={'blueGray.500'}
					placeholder='I am worried...'
					size='2xl'
					fontSize='2xl'
					fontFamily='Poppins_300Light'
					variant={'unstyled'}
					autoCapitalize='none'
					mb={-4}
					mx={-2}
				/>
				<Divider />
				<HStack>
					<Spacer />
					<TouchableOpacity area-accessibilityLabel='navagate next'>
						<Feather name='arrow-right-circle' size={30} color='gray.900' />
					</TouchableOpacity>
				</HStack>
			</VStack>
		</KeyboardAvoidingView>
	)
}
const styles = StyleSheet.create({
	form: {
		flex: 1,
		paddingTop: 200,
		paddingHorizontal: 30,
		backgroundColor: '#fafafa',
	},
})
