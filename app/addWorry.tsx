import { Entypo, Feather } from '@expo/vector-icons'
import { HStack } from 'native-base'
import React, { Component, RefObject } from 'react'
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import WorryInput from '~features/layout/WorryInput'

interface Props {}

interface State {
	screenHeight: number
	screenWidth: number
}

let scrollYPos = 0

export default class AddWorry extends Component<Props, State> {
	private scroller: RefObject<ScrollView>

	constructor(props: Props) {
		super(props)
		this.scroller = React.createRef<ScrollView>()
		this.state = {
			screenHeight: Dimensions.get('window').height,
			screenWidth: Dimensions.get('window').width,
		}
	}

	scrollToB = () => {
		scrollYPos = this.state.screenHeight * 1
		this.scroller.current?.scrollTo({ x: 0, y: scrollYPos })
	}

	scrollToC = () => {
		scrollYPos = this.state.screenHeight * 2
		this.scroller.current?.scrollTo({ x: 0, y: scrollYPos })
	}

	scrollToTop = () => {
		this.scroller.current?.scrollTo({ x: 0, y: 0 })
	}

	render() {
		return (
			<ScrollView
				ref={this.scroller}
				snapToInterval={Dimensions.get('window').height}
				snapToAlignment={'center'}
				style={{ paddingTop: 30, flex: 1 }}
			>
				<View style={styles.screen}>
					<WorryInput
						question='I am worried that...'
						placeholder='a worry'
						buttonText='submit'
					>
						<TouchableOpacity onPress={this.scrollToB}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>
				</View>
				<View style={styles.screen}>
					<WorryInput
						question='I can feel this worry...'
						placeholder='In my body...'
						buttonText='add feeling'
					>
						<TouchableOpacity onPress={this.scrollToC}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>
				</View>
				<View style={styles.screen}>
					<WorryInput
						question='The scariest bit is...'
						placeholder='very scary thing'
						buttonText='add scary bit'
					>
						<TouchableOpacity onPress={this.scrollToTop}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>

					<TouchableOpacity accessibilityLabel='exit screen'>
						<Entypo name='cross' size={24} color='black' />
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column',
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
})
