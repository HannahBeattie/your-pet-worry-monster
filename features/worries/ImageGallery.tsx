import { View } from 'native-base'
import React from 'react'
import { StyleSheet, ScrollView, Image } from 'react-native'

const images = [
	require('../../assets/spatter01.png'),
	require('../../assets/eaten.png'),
	require('../../assets/spatter02.png'),
	require('../../assets/spatter03.png'),
]

const ImageGallery: React.FC = () => {
	return (
		<ScrollView horizontal={true}>
			<View>
				<ScrollView horizontal={true}>
					{images.map((image, index) => (
						<Image source={image} key={index} style={styles.image} />
					))}
				</ScrollView>
				<ScrollView horizontal={true}>
					{images.map((image, index) => (
						<Image source={image} key={index} style={styles.image} />
					))}
				</ScrollView>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 150,
		height: 150,
		resizeMode: 'cover',
		marginRight: 10,
	},
})

export default ImageGallery
