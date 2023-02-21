import { VStack } from 'native-base'
import React, { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function Page({ children }: PropsWithChildren) {
	return <VStack variant={'page'}>{children}</VStack>
}
