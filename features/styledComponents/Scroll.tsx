import { ScrollView, VStack } from 'native-base'
import React, { PropsWithChildren } from 'react'

function Scroll({ children }: PropsWithChildren) {
	return (
		<VStack backgroundColor={'gray.900'} flex={1}>
			<ScrollView>{children}</ScrollView>
		</VStack>
	)
}

export default Scroll
