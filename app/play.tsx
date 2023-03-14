import { Heading, HStack, Image, ScrollView, View, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import typescript from 'react-native-svg'
import MapWorry from '~features/experiments/MapWorry'
import ParallaxScroll from '~features/styledComponents/animation/ParallaxScroll'
// @ts-ignore.
import spatter from '../assets/spatter01.png'
// @ts-ignore.
import spatter2 from '../assets/spatter02.png'
// @ts-ignore.
import spatter3 from '../assets/spatter03.png'

export default function Play() {
	const img = [spatter, spatter2, spatter3]
	const rv = [spatter3, spatter, spatter, spatter2, spatter3]
	const { width, height } = useWindowDimensions()
	return (
		<VStack backgroundColor={'black'} flex={1} minW={'100%'}>
			<Heading>ParallaxScroll</Heading>

			<ScrollView horizontal={true}>
				<VStack flex={1} width={'full'}>
					<>
						{img.map((image, index) => (
							<View
								style={{
									flexDirection: 'row',
									flex: 1,
									alignItems: 'stretch',
									minWidth: width,
								}}
							>
								<ParallaxScroll key={index} image={image} order={index + 1} />
							</View>
						))}
					</>
					<MapWorry />
					<>
						{rv.map((image, index) => (
							<View
								style={{
									minWidth: width,
									flexDirection: 'row',
									flex: 1,
									alignItems: 'stretch',
								}}
							>
								<ParallaxScroll
									key={index + 1}
									image={image}
									order={index * index}
								/>
							</View>
						))}
					</>
				</VStack>
			</ScrollView>
		</VStack>
	)
}
