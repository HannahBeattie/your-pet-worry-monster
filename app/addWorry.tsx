// import { checkTargetForNewValues } from 'framer-motion'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Button,
	Divider,
	Heading,
	HStack,
	Input,
	KeyboardAvoidingView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import HomeButton from '~features/layout/HomeButton'

interface FormProps {
	question: string
	placeholder: string
	icon: any
	buttonText: string
	hideButton: boolean
	nextRoute: string
	handleButton: any
}

export default function AddWorry({
	question,
	placeholder,
	icon,
	buttonText,
	hideButton,
	nextRoute,
	handleButton,
}: FormProps) {
	// const textareaRef = useRef<TextInput>(null)

	const handleChange = useCallback((text: string) => {
		console.log('Changed value to: ', text)
	}, [])

	// useEffect(() => {
	// 	if (textareaRef.current === null) {
	// 		return
	// 	}

	// 	textareaRef.current.focus()
	// }, [textareaRef])

	const { height, width } = useWindowDimensions()
	const router = useRouter()
	return (
		<KeyboardAvoidingView behavior='padding' style={styles.form}>
			<VStack space={4} h={height}>
				<Heading fontFamily='Poppins_300Light' color={'black'}>
					{question ? question : 'question'}
				</Heading>

				<Input
					onChangeText={handleChange}
					// ref={textareaRef}
					multiline
					color={'blueGray.900'}
					placeholderTextColor={'blueGray.500'}
					placeholder={placeholder ? placeholder : 'placeholder'}
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
					{!hideButton && (
						<TouchableOpacity>
							<Button
								onPress={() => {
									handleButton()
								}}
							>
								<Text>{buttonText ? buttonText : 'button'}</Text>
							</Button>
						</TouchableOpacity>
					)}
					<Spacer />
					<TouchableOpacity
						area-accessibilityLabel='navagate next'
						onPress={() => {
							router.push(nextRoute ? nextRoute : '/monsterMenu')
						}}
					>
						{icon ? (
							icon
						) : (
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						)}
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
