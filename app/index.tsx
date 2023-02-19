import { VStack } from 'native-base'
import React from 'react'
import DangerousDelete from '~features/components/DangerousDelete'
import Gregory from '~features/components/Gregory'
import InputName from '~features/components/InputName'
import InputWorry from '~features/components/InputWorry'
import YouHaveWorried from '~features/components/YouHaveWorried'

export default function Page() {
	return (
		<VStack
			backgroundColor={'coolGray.900'}
			flex={1}
			alignItems={'stretch'}
			py={90}
			px={8}
			color={'white'}
			space={4}
		>
			{/* <YouHaveWorried /> */}
			<Gregory />
			{/* <InputName /> */}
			{/* <InputWorry /> */}
			{/* <DangerousDelete /> */}
		</VStack>
	)
}
