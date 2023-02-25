import { Button, HStack, Spacer } from 'native-base'
import React, { ReactComponentElement } from 'react'
import { ButtonProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ButtonComponentProps {
	handlePress: any
	children: JSX.Element | JSX.Element[]
}
export function ButtonLight({ handlePress, children }: ButtonComponentProps) {
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

export function ButtonDark({ handlePress, children }: any) {
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

export function MultiUse({ handlePress, children }: any) {
	return (
		<TouchableOpacity
			onPress={() => {
				handlePress()
			}}
		>
			<Button backgroundColor={'gray.900'}>{children}</Button>
		</TouchableOpacity>
	)
}
