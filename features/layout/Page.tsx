import { VStack } from 'native-base'
import React, { PropsWithChildren } from 'react'

export default function Page({ children }: PropsWithChildren) {
	return <VStack variant={'page'}>{children}</VStack>
}
