// import { checkTargetForNewValues } from 'framer-motion'
import { Entypo } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'
import {
	Box,
	Button,
	Divider,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	Spacer,
	Text,
	VStack,
} from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { WorryField } from '~features/worries/worrySlice'
import CircleIconButton from './CircleIconButton'
import ExitPage from './ExitPage'
import PageWrapper from './PageWrapper'

export interface WorryInputProps {
	name: WorryField
	question: string
	placeholder?: string
	value?: string
	onChangeText: (name: WorryField, value: string) => void
	onSubmit: () => void
	onClose: () => void
	nextButtonText?: string
	onNextButtonPress?: () => void
	onValidate?: (value?: string) => string | undefined
}

export default function WorryInput({
	name,
	question,
	placeholder,
	value,
	onChangeText,
	onSubmit,
	onClose,
	nextButtonText,
	onNextButtonPress,
	onValidate,
}: WorryInputProps) {
	const ref = useRef<any>(null)
	const monsterName = useSelector(monsterNameSelector)
	const hasNext = nextButtonText && onNextButtonPress
	const noError = ' '
	const [error, setError] = useState(noError)
	const [dirty, setDirty] = useState(false)
	const validationError = useMemo(
		() => (onValidate && onValidate(value)) ?? noError,
		[onValidate, value]
	)
	const canContinue = !validationError.trim().length // can continue if validationError is empty

	const handleChange = useCallback(
		(text: string) => {
			onChangeText(name, text)
			setDirty(true)
		},
		[name, onChangeText]
	)

	const onBlur = useCallback(() => {
		// Called when the keyboard is closed, set the error if the input isn't valid
		setDirty(true)
		if (onValidate) {
			const err = onValidate(value)
			setError(err ?? noError)
		}
	}, [onValidate, value])

	useEffect(() => {
		// Clear the validation error if the input was bad but now it's good
		if (error === validationError) {
			return // it's the same so no need to update
		}
		if (!error.trim().length) {
			return // error is empty, let onBlur handle setting new errors
		}
		setError(validationError) // clear the error message
	}, [error, validationError])

	return (
		<PageWrapper py={-4} px={-1}>
			<ExitPage onClose={onClose} />
			<KeyboardAwareScrollView
				enableAutomaticScroll
				keyboardShouldPersistTaps='handled'
				extraHeight={200}
			>
				<VStack pt={100} pb={16} alignItems='stretch' justifyContent='center'>
					<Animated.View
						entering={FadeInDown.delay(200)}
						exiting={FadeOutUp}
						style={{
							display: 'flex',
							alignItems: 'stretch',
							flexDirection: 'column',
						}}
					>
						<VStack px={30} alignItems='stretch'>
							<Heading fontFamily='poppins' color={'white'} py={4}>
								{question}
							</Heading>

							<Input
								ref={ref}
								onChangeText={handleChange}
								color={'white'}
								placeholderTextColor={'blueGray.400'}
								placeholder={placeholder}
								value={value}
								size='xl'
								fontSize='lg'
								fontFamily='Poppins'
								variant={'unstyled'}
								autoCapitalize='none'
								mx={-2}
								maxLength={160}
								multiline
								autoFocus
								isFocused
								isFullWidth
								blurOnSubmit
								returnKeyType={hasNext ? 'next' : 'done'}
								onBlur={onBlur}
								selectionColor={'white'}
								onSubmitEditing={() => {
									if (!canContinue) {
										return
									}
									if (hasNext) {
										return onNextButtonPress()
									}
									onSubmit()
								}}
							/>

							<Divider />

							<Text color={'red.400'} pt={1} pl={1} pb={2} fontSize='md'>
								{dirty ? error : ' '}
							</Text>

							<HStack alignItems='flex-start' space={2}>
								<Button
									onPress={onSubmit}
									isDisabled={!canContinue}
									isFocused={false}
									bg={'gray.300'}
									borderRadius={'md'}
									py={4}
									px={3}
									maxW={'170'}
									_pressed={{ backgroundColor: 'gray.200' }}
								>
									<Text
										textAlign={'center'}
										color={'black'}
										fontSize={'sm'}
										fontWeight={600}
										fontFamily={'poppins'}
									>
										Give it to {monsterName}
									</Text>
								</Button>
								{hasNext ? (
									<Button
										isFocused={false}
										variant={'outline'}
										backgroundColor={'transparent'}
										onPress={onNextButtonPress}
										isDisabled={!canContinue}
										borderColor={'gray.700'}
										py={4}
										px={2}
										flex={1}
									>
										<Text
											color={'white'}
											fontSize={'sm'}
											fontWeight={600}
											fontFamily={'poppins'}
										>
											{nextButtonText}
										</Text>
									</Button>
								) : (
									<Spacer />
								)}
							</HStack>
						</VStack>
					</Animated.View>
				</VStack>
			</KeyboardAwareScrollView>
		</PageWrapper>
	)
}
