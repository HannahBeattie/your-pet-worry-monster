// import { checkTargetForNewValues } from 'framer-motion'
import { Entypo } from '@expo/vector-icons'
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
import React, { useCallback, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { monsterNameSelector } from '~features/monster/monsterSlice'
import { WorryField } from '~features/worries/worrySlice'

export interface WorryInputProps {
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
}: WorryInputProps) {
	const ref = useRef<any>(null)
	const monsterName = useSelector(monsterNameSelector)

	const handleChange = useCallback(
		(text: string) => {
			onChangeText(name, text)
		},
		[name, onChangeText]
	)

	const [error, setError] = React.useState('')

	const canContinue = !!value?.length || !required
	const hasNext = nextButtonText && onNextButtonPress

	return (
		<VStack alignItems={'stretch'} flex={1}>
			<HStack position={'sticky'}>
				<IconButton
					position={'fixed'}
					p={6}
					icon={<Icon as={Entypo} name='cross' size='lg' />}
					_icon={{ color: 'black' }}
					onPress={onClose}
					accessibilityLabel='exit screen'
					variant={'unstyled'}
				/>
			</HStack>
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
							<Heading fontFamily='Poppins_300Light' color={'black'} py={4}>
								{question}
							</Heading>

							<Input
								ref={ref}
								onChangeText={handleChange}
								color={'blueGray.900'}
								placeholderTextColor={'blueGray.500'}
								placeholder={placeholder}
								value={value}
								size='xl'
								fontSize='lg'
								fontFamily='Poppins_300Light'
								variant={'unstyled'}
								autoCapitalize='none'
								mx={-2}
								maxLength={180}
								multiline
								autoFocus
								isFocused
								isFullWidth
								blurOnSubmit
								returnKeyType={hasNext ? 'next' : 'done'}
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

							<Text color={'red.300'}>{error}</Text>

							<HStack alignItems='flex-start' space={2}>
								<Button
									onPress={onSubmit}
									isDisabled={!canContinue}
									isFocused={false}
									bg={'blueGray.900'}
									borderRadius={'md'}
									// flex={0.8}
									py={4}
									px={3}
								>
									<Text
										textAlign={'center'}
										color={'white'}
										fontSize={'sm'}
										fontWeight={600}
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
										borderColor={'blueGray.400'}
										py={4}
										px={2}
										flex={1}
									>
										<Text
											// textAlign={'center'}
											color={'black'}
											fontSize={'sm'}
											fontWeight={600}
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
		</VStack>
	)
}
