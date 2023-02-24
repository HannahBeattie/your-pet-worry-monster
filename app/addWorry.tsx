import { Feather } from '@expo/vector-icons'
import React, { Component } from 'react'
import {
	Dimensions,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import WorryInput from '~features/layout/WorryInput'

// import React, { useRef } from 'react'
// import { ScrollView } from 'react-native-gesture-handler'
// import WorryInput from '~features/layout/WorryInput'

// export default function addWorry() {
// 	const first = useRef(null)
// 	const second = useRef(null)
// 	const third = useRef(null)

// 	return (
// 		<ScrollView>
// 			<WorryInput inputRef={first} nextRef={second} />
// 			<WorryInput inputRef={second} nextRef={third} />
// 			<WorryInput inputRef={third} nextRef={first} />
// 		</ScrollView>
// 	)
// // }

// <TouchableOpacity
// 							area-accessibilityLabel='navagate next'
// 							onPress={() => {
// 								handleScroll(nextRef)
// 								console.log('going from:', inputRef, 'to:', nextRef)
// 							}}
// 						>
// 							{icon ? (
// 								icon
// 							) : (
// 								<Feather name='arrow-right-circle' size={30} color='gray.900' />
// 							)}
// 						</TouchableOpacity>
let scrollYPos = 0

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			screenHeight: Dimensions.get('window').height,
			screenWidth: Dimensions.get('window').width,
		}
	}

	scrollToB = () => {
		scrollYPos = this.state.screenHeight * 1
		this.scroller.scrollTo({ x: 0, y: scrollYPos })
	}
	scrollToC = () => {
		scrollYPos = this.state.screenHeight * 2
		this.scroller.scrollTo({ x: 0, y: scrollYPos })
	}
	scrollToTop = () => {
		this.scroller.scrollTo({ x: 0, y: 0 })
	}

	render() {
		return (
			<ScrollView
				style={styles.container}
				ref={(scroller) => {
					this.scroller = scroller
				}}
			>
				<View style={styles.screen}>
					<WorryInput>
						<TouchableOpacity onPress={this.scrollToB}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>
				</View>
				<View style={styles.screen}>
					<WorryInput>
						<TouchableOpacity onPress={this.scrollToC}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>
				</View>
				<View style={styles.screen}>
					<WorryInput>
						<TouchableOpacity onPress={this.scrollToTop}>
							<Feather name='arrow-right-circle' size={30} color='gray.900' />
						</TouchableOpacity>
					</WorryInput>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screen: {
		flexDirection: 'column',
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
})
