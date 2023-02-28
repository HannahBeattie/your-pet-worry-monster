import { Image, Text, VStack } from 'native-base'
import React from 'react'
import { MotiView, MotiText } from 'moti'
import Blue from '~features/monster/Blue'
import { useWindowDimensions } from 'react-native'

function ZoomOut({ children }: any) {
	const { height, width } = useWindowDimensions()

	return (
		<VStack>
			<MotiView
				style={{
					minHeight: height,
					alignContent: 'center',
					justifyContent: 'center',
				}}
				from={{}}
				animate={{ scale: [100, 1] }}
				transition={{
					// loop: true,

					type: 'timing',
					duration: 500,
					repeatReverse: false,
				}}
			>
				{children}
			</MotiView>
		</VStack>
	)
}

export default ZoomOut
