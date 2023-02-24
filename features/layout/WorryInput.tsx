// import { checkTargetForNewValues } from 'framer-motion'
import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Button,
	Divider,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	KeyboardAvoidingView,
	ScrollView,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useCallback } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { WorryField } from '~features/worries/worrySlice'
// import HomeButton from '~features/layout/HomeButton'

interface FormProps {
	name: WorryField
	question: string
	placeholder?: string
	value?: string
	onChangeText: (name: WorryField, value: string) => void
	onSubmit: () => void
	required?: boolean
	nextButtonText?: string
	onNextButtonPress?: () => void
}

export default function WorryInput({
	name,
	question,
	placeholder,
	value,
	onChangeText,
	onSubmit,
	required,
	nextButtonText,
	onNextButtonPress,
}: FormProps) {
	// const textareaRef = useRef<TextInput>(null)
	const monsterName = useSelector(monsterNameSelector)

	const handleChange = useCallback(
		(text: string) => {
			// console.log(`"${name}" changed value to: `, text)
			onChangeText(name, text)
		},
		[name, onChangeText]
	)

	const { height } = useWindowDimensions()
	const router = useRouter()

	// user can continue if they've entered a value or if the field is not required
	const canContinue = !!value || !required

	return (
		<ScrollView>
			<HStack backgroundColor={'#fafafa'} pt={4} px={2}>
				<IconButton
					icon={<Icon as={Entypo} name='cross' />}
					_icon={{ color: 'black' }}
					onPress={() => {
						router.push('/monsterMenu')
					}}
					accessibilityLabel='exit screen'
				/>
			</HStack>
			<KeyboardAvoidingView behavior='padding' style={styles.form}>
				<VStack space={4} h={height}>
					<Heading fontFamily='Poppins_300Light' color={'black'}>
						{question}
					</Heading>

					<Input
						onChangeText={handleChange}
						multiline
						color={'blueGray.900'}
						placeholderTextColor={'blueGray.500'}
						placeholder={placeholder}
						value={value}
						size='2xl'
						fontSize='2xl'
						fontFamily='Poppins_300Light'
						variant={'unstyled'}
						autoCapitalize='none'
						mb={-4}
						mx={-2}
						maxLength={400}
					/>
					<Divider />
					<HStack space='5'>
						{canContinue ? (
							<>
								<Button flex={1} onPress={onSubmit}>
									<Text>Give to {monsterName}</Text>
								</Button>
								{nextButtonText && onNextButtonPress ? (
									<Button flex={1} onPress={onNextButtonPress}>
										<Text>{nextButtonText}</Text>
									</Button>
								) : (
									<Spacer />
								)}
							</>
						) : (
							<Spacer />
						)}
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
