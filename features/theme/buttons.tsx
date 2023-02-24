import { Button, HStack, Spacer } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function ButtonLight({ handlePress, props, children }: any) {
	return (
		<HStack pt={4}>
			<Spacer />
			<TouchableOpacity
				onPress={() => {
					handlePress()
				}}
			>
				<Button backgroundColor={'gray.100'}>{children}</Button>
			</TouchableOpacity>
		</HStack>
	)
}

export function ButtonDark({ handlePress, props, children }: any) {
	return (
		<HStack pt={4}>
			<Spacer />
			<TouchableOpacity
				onPress={() => {
					handlePress()
				}}
			>
				<Button backgroundColor={'gray.900'}>{children}</Button>
			</TouchableOpacity>
		</HStack>
	)
}
