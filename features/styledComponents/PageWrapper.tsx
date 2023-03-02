import { StyledProps, VStack } from 'native-base'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native'

interface Props {
	children: React.ReactNode
	props?: StyledProps
	py?: number | string
	px?: number | string
}

const PageWrapper: React.FC<Props> = ({ children, props, px, py }) => {
	return (
		<VStack flex={1} backgroundColor={'gray.900'}>
			<SafeAreaView style={{ flex: 1 }}>
				<VStack flex={1} {...props} px={px ? px : 4} py={py ? py : 4}>
					{children}
				</VStack>
			</SafeAreaView>
		</VStack>
	)
}

export default PageWrapper
