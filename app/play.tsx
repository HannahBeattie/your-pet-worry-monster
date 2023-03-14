import { Center, Heading, HStack, Image, ScrollView, View, VStack } from 'native-base'
import React from 'react'
import { ImageBackground, SafeAreaView, useWindowDimensions } from 'react-native'
import typescript from 'react-native-svg'
import { useSelector } from 'react-redux'
import MapWorry from '~features/experiments/MapWorry'
import ParallaxScroll from '~features/styledComponents/animation/ParallaxScroll'
import { selectAllInactive } from '~features/worries/worrySlice'
// @ts-ignore.
import spatter from '../assets/spatter01.png'
// @ts-ignore.
import spatter2 from '../assets/spatter02.png'
// @ts-ignore.
import spatter3 from '../assets/spatter03.png'
// @ts-ignore.

const bg = require('../assets/bg/tum.png')

export default function Play() {
	const img = [spatter, spatter2, spatter3, spatter2, spatter3, spatter]
	const { width, height } = useWindowDimensions()
	const worryData = useSelector(selectAllInactive)
	const chunks = Math.ceil(worryData.length / 1)
	const imgChunks = Array.from({ length: chunks }, (_, i) => {
		return img
	})

	return (
		<>
			<ImageBackground
				source={bg}
				style={{
					flex: 1,
					backgroundColor: 'black',
					overflow: 'visible',
					flexDirection: 'row',
					minWidth: width,
					minHeight: height,
					alignContent: 'stretch',
				}}
				resizeMode={'repeat'}
			>
				<SafeAreaView style={{ flex: 1, backgroundColor: '#000000c9' }}>
					<ScrollView horizontal={true}>
						<VStack flex={1} width={'full'}>
							<View
								style={{
									flexDirection: 'row',
									flex: 1,
									alignItems: 'stretch',
								}}
							>
								{imgChunks[0].map((image, imageIndex) => (
									<ParallaxScroll
										key={imageIndex}
										image={image}
										order={imageIndex + 1}
									/>
								))}
							</View>
							<View style={{ flex: 1 }}>
								<MapWorry worryData={worryData} />
							</View>
							<View style={{ flexDirection: 'row', flex: 1 }}>
								{imgChunks[1].map((image, imageIndex) => (
									<ParallaxScroll
										key={imageIndex + imgChunks[0].length}
										image={image}
										order={imageIndex + 2}
									/>
								))}
							</View>
						</VStack>
					</ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</>
	)
}
