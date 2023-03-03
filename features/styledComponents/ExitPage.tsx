import { HStack, Spacer } from 'native-base'
import React from 'react'
import CircleIconButton from './CircleIconButton'

interface Props {
	onClose: () => void
}
function ExitPage({ onClose }: Props) {
	return (
		<HStack>
			<Spacer />
			<CircleIconButton
				color='gray.500'
				size={'lg'}
				tag='exit'
				arealabel='exit'
				handlePress={onClose}
			/>
		</HStack>
	)
}

export default ExitPage
