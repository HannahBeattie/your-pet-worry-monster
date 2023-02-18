import { VStack } from 'native-base'
import React from 'react'
import InputName from '~features/components/InputName'
import InputWorry from '~features/components/InputWorry'
import YouHaveWorried from '~features/components/YouHaveWorried'

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
			<YouHaveWorried />
			{/* <InputName /> */}
			<InputWorry />
		</VStack>
	)
}
