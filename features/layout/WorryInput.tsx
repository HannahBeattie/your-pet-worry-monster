// import { checkTargetForNewValues } from 'framer-motion'
import {
	Button,
	Divider,
	Heading,
	HStack,
	Input,
	KeyboardAvoidingView,
	ScrollView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useCallback } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import HomeButton from '~features/layout/HomeButton'

interface FormProps {
	question?: string
	placeholder?: string
	buttonText?: string
	hideButton?: boolean
	nextRoute?: string
	handleButton?: any
	children: any
	scroll?: any
}

export default function WorryInput({
	question,
	placeholder,
	buttonText,
	hideButton,
	nextRoute,
	handleButton,
	children,
}: FormProps) {
	// const textareaRef = useRef<TextInput>(null)

	const handleChange = useCallback((text: string) => {
		console.log('Changed value to: ', text)
	}, [])

	const { height } = useWindowDimensions()

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior='padding' style={styles.form}>
				<VStack space={4} h={height}>
					<Heading fontFamily='Poppins_300Light' color={'black'}>
						{question ? question : 'question'}
					</Heading>

					<Input
						onChangeText={handleChange}
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
						{children}
					</HStack>
				</VStack>
			</KeyboardAvoidingView>
		</ScrollView>
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
