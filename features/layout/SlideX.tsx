import { Box, HStack, Image } from 'native-base'
import React from 'react'
import { ImageSourcePropType, useWindowDimensions } from 'react-native'
import HomeButton from './HomeButton'

type WorryData = {
	time: number | string
	title: string
	description?: string
}

interface SlideProps {
	arr?: Array<any> | any
	imageArray?: Array<string> | any
	imProps?: any
	worryArray?: Array<WorryData>
	// worryArray?: Worry[]
}

export default function SlideX({ imageArray }: SlideProps) {
	const { height, width } = useWindowDimensions()

	return (
		<>
			<HStack minW={'100%'} flex={1} alignItems={'center'}>
				{imageArray.map((i: ImageSourcePropType, index: number) => (
					<Box key={index} p={100} mx={200}>
						<Image
							overflow={'visible'}
							boxSize={'450'}
							resizeMode={'cover'}
							alt='spatter'
							maxW={width / 4}
							source={i}
							zIndex={0}
							key={index}
						/>
					</Box>
				))}
			</HStack>
		</>
	)
}
