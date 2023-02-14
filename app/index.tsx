import { VStack } from 'native-base'
import React from 'react'
import InputName from '~features/components/InputName'
import InputWorry from '~features/components/InputWorry'

export default function Page() {
	return (
		<VStack
			backgroundColor={'coolGray.900'}
			flex={1}
			alignItems={'center'}
			py={90}
			px={8}
			color={'white'}
			space={4}
		>
			{/* <InputName /> */}
			<InputWorry />
		</VStack>
	)
}
