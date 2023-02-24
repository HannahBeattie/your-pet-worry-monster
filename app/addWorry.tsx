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

	const getScrollToPage = useCallback(
		(pageNum: number) => {
			return () => {
				scroller.current?.scrollTo({ x: 0, y: screenHeight * pageNum })
			}
		},
		[scroller, screenHeight]
	)

	const onChange = useCallback(
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

	const onSubmit = useCallback(() => {
		console.log('TODO: Check that worry has required fields:', newWorry)
		dispatch(addWorry(newWorry as Worry))
		setNewWorry({})
		router.push('/monsterMenu')
	}, [newWorry])

	return (
		<ScrollView
			ref={scroller}
			snapToInterval={Dimensions.get('window').height}
			snapToAlignment={'center'}
			style={{ paddingTop: 30, flex: 1 }}
		>
			<View style={styles.screen}>
				<WorryInput
					onChangeText={onChange}
					onSubmit={onSubmit}
					value={newWorry.description}
					name='description'
					question='I am worried that...'
					placeholder='a worry'
					// buttonText='submit'
					nextButtonText='I can feel this worry...'
					onNextButtonPress={getScrollToPage(1)}
					required
				/>
			</View>
			<View style={styles.screen}>
				<WorryInput
					onChangeText={onChange}
					onSubmit={onSubmit}
					value={newWorry.extraNote}
					name='extraNote'
					question='The scariest bit is...'
					placeholder='very scary thing'
				/>
			</View>
			{/* <View style={styles.screen}>
				<WorryInput
					question='I can feel this worry...'
					placeholder='somewhere in my body'
				/>
			</View> */}
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
