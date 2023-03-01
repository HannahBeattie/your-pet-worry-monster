// import { checkTargetForNewValues } from 'framer-motion'
import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Box,
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
import React, { useCallback, useEffect, useRef } from 'react'
import {
	Dimensions,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	useWindowDimensions,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
	const router = useRouter()
	const monsterName = useSelector(monsterNameSelector)

	const handleChange = useCallback(
		(text: string) => {
			// console.log(`"${name}" changed value to: `, text)
			onChangeText(name, text)
		},
		[name, onChangeText]
	)

	const { height } = useWindowDimensions()

	const [error, setError] = React.useState('')

	const canContinue = !!value?.length || !required

	return (
		<ScrollView
			scrollEnabled={false}
			snapToInterval={Dimensions.get('window').height}
			snapToAlignment={'center'}
			contentInsetAdjustmentBehavior='automatic'
			keyboardShouldPersistTaps='handled'
		>
			<VStack flex={1} justifyItems={'stretch'} alignContent={'cener'}>
				<HStack position={'sticky'}>
					<IconButton
						position={'fixed'}
						icon={<Icon as={Entypo} name='cross' />}
						_icon={{ color: 'black' }}
						onPress={() => {
							router.push('/monsterMenu')
						}}
						accessibilityLabel='exit screen'
						variant={'unstyled'}
					/>
				</HStack>
				<KeyboardAvoidingView
					flex={1}
					minH={height}
					behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				>
					<KeyboardAwareScrollView
						enableAutomaticScroll
						pagingEnabled
						extraHeight={100}
						extraScrollHeight={100}
					>
						<VStack flex={1} pt={100} h={height}>
							<VStack px={30}>
								<Heading fontFamily='Poppins_300Light' color={'black'} py={4}>
									{question}
								</Heading>

								<Input
									maxH={290}
									ref={ref}
									onChangeText={handleChange}
									multiline
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
									autoFocus={true}
									isFocused={true}
								/>

								<Divider />

								<Text color={'red.300'}>{error}</Text>

								<>
									<HStack>
										<Button
											onPress={onSubmit}
											isDisabled={!canContinue}
											isFocused={false}
										>
											<Box bg={'blueGray.900'} borderRadius={'sm'}>
												<Text
													maxW={180}
													textAlign={'center'}
													color={'white'}
													fontSize={'sm'}
													fontWeight={600}
													py={2}
												>
													Give it to {monsterName}
												</Text>
											</Box>
										</Button>
										<Spacer />
										{nextButtonText && onNextButtonPress ? (
											<Button
												isFocused={false}
												variant={'ghost'}
												backgroundColor={'gray.100'}
												onPress={onNextButtonPress}
												isDisabled={!canContinue}
											>
												<Box bg={''} borderRadius={'sm'}>
													<Text
														pr={4}
														py={2}
														textAlign={'center'}
														color={'black'}
														fontSize={'sm'}
														fontWeight={600}
													>
														{nextButtonText}
													</Text>
												</Box>
											</Button>
										) : (
											<Spacer />
										)}
									</HStack>
								</>

								<Spacer />
							</VStack>
						</VStack>
					</KeyboardAwareScrollView>
				</KeyboardAvoidingView>
			</VStack>
		</ScrollView>
		// </KeyboardAwareScrollView>
	)
}
const styles = StyleSheet.create({
	form: {
		flex: 1,
		paddingHorizontal: 30,
		pt: 100,
		backgroundColor: '#fafafa',
	},
	screen: {
		flexDirection: 'column',
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
})
