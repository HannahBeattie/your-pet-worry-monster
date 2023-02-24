import { Entypo, Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { HStack } from 'native-base'
import React, { Component, FC, RefObject, useCallback, useRef, useState } from 'react'
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import WorryInput from '~features/layout/WorryInput'
import { addWorry, Worry, WorryField } from '~features/worries/worrySlice'

interface Props {}

// interface State {
// 	screenHeight: number
// 	screenWidth: number
// }

// let scrollYPos = 0

// export default class AddWorry extends Component<Props, State> {
// 	private scroller: RefObject<ScrollView>

// 	constructor(props: Props) {
// 		super(props)
// 		this.scroller = React.createRef<ScrollView>()
// 		this.state = {
// 			screenHeight: Dimensions.get('window').height,
// 			screenWidth: Dimensions.get('window').width,
// 		}
// 	}

// 	scrollToB = () => {
// 		scrollYPos = this.state.screenHeight * 1
// 		this.scroller.current?.scrollTo({ x: 0, y: scrollYPos })
// 	}

// 	scrollToC = () => {
// 		scrollYPos = this.state.screenHeight * 2
// 		this.scroller.current?.scrollTo({ x: 0, y: scrollYPos })
// 	}

// 	scrollToTop = () => {
// 		this.scroller.current?.scrollTo({ x: 0, y: 0 })
// 	}

// 	render() {

const AddWorry: FC<Props> = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const scroller = useRef<ScrollView>(null)
	const { height: screenHeight } = useWindowDimensions()
	const [newWorry, setNewWorry] = useState<Partial<Worry>>({})
	const [whichFocus, setWhichFocus] = useState(0)

	const getScrollToPage = useCallback(
		(pageNum: number) => {
			return () => {
				scroller.current?.scrollTo({ x: 0, y: screenHeight * pageNum })
				setWhichFocus(pageNum)
			}
		},
		[scroller, screenHeight]
	)

	const onChangeText = useCallback(
		(name: WorryField, value: string) => {
			// console.log(`${name} => ${value}`)
			const update: Partial<Worry> = newWorry.id
				? { ...newWorry }
				: {
						id: +new Date(),
						isActive: true,
				  }
			update[name] = value
			setNewWorry(update)
		},
		[newWorry]
	)

	const onClose = useCallback(() => {
		setNewWorry({})
		const scrollTo = getScrollToPage(0)
		scrollTo()
		router.push('/monsterMenu')
	}, [getScrollToPage])

	const onSubmit = useCallback(() => {
		console.log('TODO: Check that worry has required fields:', newWorry)
		dispatch(addWorry(newWorry as Worry))
		onClose()
	}, [newWorry, onClose])

	const sharedInputProps = ({ name, page }: { name: WorryField; page: number }) => ({
		onChangeText,
		onSubmit,
		onClose,
		name,
		value: newWorry[name],
		onNextButtonPress: getScrollToPage(page + 1),
		autofocus: whichFocus === page,
	})

	return (
		<ScrollView
			ref={scroller}
			snapToInterval={Dimensions.get('window').height}
			snapToAlignment={'center'}
			style={{ paddingTop: 30, flex: 1 }}
		>
			<View style={styles.screen}>
				<WorryInput
					{...sharedInputProps({ name: 'description', page: 0 })}
					question='I am worried that...'
					placeholder='a worry'
					nextButtonText='The scariest bit is...'
					required
				/>
			</View>
			<View style={styles.screen}>
				<WorryInput
					{...sharedInputProps({ name: 'extraNote', page: 1 })}
					question='The scariest bit is...'
					placeholder='very scary thing'
					nextButtonText='I can feel this worry...'
					// disabled={!!newWorry.description?.length}
				/>
			</View>
			<View style={styles.screen}>
				<WorryInput
					{...sharedInputProps({ name: 'sensation', page: 2 })}
					question='I can feel this worry...'
					placeholder='somewhere in my body'
					// disabled={!!newWorry.description?.length}
				/>
			</View>
		</ScrollView>
	)
}
export default AddWorry

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column',
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
})
