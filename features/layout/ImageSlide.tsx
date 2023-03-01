import { Box, HStack, Image } from 'native-base'
import React from 'react'
import { ImageSourcePropType, useWindowDimensions } from 'react-native'
import HomeButton from './HomeButton'

export default function ImageSlide({ imageArray }: any) {
	const { height, width } = useWindowDimensions()

	return (
		<>
			<HStack minW={'100%'} flex={1} position={'absolute'} zIndex={-2}>
				{imageArray.map((i: ImageSourcePropType, index: number) => (
					<Box key={index} p={100} mx={200}>
						<Image
							overflow={'visible'}
							boxSize={190}
							resizeMode={'cover'}
							alt='spatter'
							maxW={width / 4}
							source={i}
							zIndex={-4}
							key={index}
						/>
					</Box>
				))}
			</HStack>
		</>
	)
}
