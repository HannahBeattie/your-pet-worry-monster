// import { checkTargetForNewValues } from 'framer-motion'
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
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
import { IInputComponentType } from 'native-base/lib/typescript/components/primitives/Input/types'
import React, { useCallback, useEffect, useRef } from 'react'
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native'
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
	onClose: () => void
	required?: boolean
	nextButtonText?: string
	onNextButtonPress?: () => void
	autofocus?: boolean
}

export default function WorryInput({
	name,
	question,
	placeholder,
	value,
	onChangeText,
	onSubmit,
	onClose,
	required,
	nextButtonText,
	onNextButtonPress,
	autofocus,
}: FormProps) {
	const ref = useRef<any>(null)
	const monsterName = useSelector(monsterNameSelector)

	const handleChange = useCallback(
		(text: string) => {
			// console.log(`"${name}" changed value to: `, text)
			onChangeText(name, text)
		},
		[name, onChangeText]
	)

	const { height } = useWindowDimensions()

	useEffect(() => {
		if (!autofocus || !ref.current) {
			return
		}
		if (ref.current.focus) {
			console.log('Autofocus!!!', name, ref.current)
			ref.current.focus()
		} else {
			console.log('No focus??', name, ref.current)
		}
	}, [ref, autofocus])

	// user can continue if they've entered a value or if the field is not required
	const canContinue = !!value || !required

	return (
		<ScrollView>
			<HStack backgroundColor={'#fafafa'} pt={4} px={2}>
				<IconButton
					icon={<Icon as={Entypo} name='cross' />}
					_icon={{ color: 'black' }}
					onPress={onClose}
					accessibilityLabel='exit screen'
				/>
			</HStack>
			<KeyboardAvoidingView behavior='padding' style={styles.form}>
				<VStack space={4} h={height}>
					<Heading fontFamily='Poppins_300Light' color={'black'}>
						{question}
					</Heading>

					<Input
						ref={ref}
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
						autoFocus={true}
					/>
					<Divider />

					{canContinue ? (
						<>
							<HStack space={4} mx={-4}>
								<Pressable onPress={onSubmit}>
									<VStack
										borderRadius={'md'}
										maxW={40}
										backgroundColor={'blueGray.900'}
										p={2}
									>
										<Text textAlign={'center'} color={'white'} fontSize={'sm'}>
											Give it to {monsterName}
										</Text>
									</VStack>
								</Pressable>
								<Spacer />
								{nextButtonText && onNextButtonPress ? (
									<Button onPress={onNextButtonPress}>
										<HStack>
											<Text fontSize={'md'} color={'blueGray.500'}>
												{nextButtonText}
											</Text>
											<FontAwesome5
												p={2}
												name='caret-right'
												size={24}
												color='#3b3d6d'
											/>
										</HStack>
									</Button>
								) : (
									<Spacer />
								)}
							</HStack>
						</>
					) : (
						<Spacer />
					)}
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
