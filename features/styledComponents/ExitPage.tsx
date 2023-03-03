import { useRouter } from 'expo-router'
import { HStack, Spacer } from 'native-base'
import React from 'react'
import CircleIconButton from './CircleIconButton'

interface Props {
	close?: () => void
}

function ExitPage({ close }: Props) {
	const router = useRouter()
	const handleClose = React.useCallback(() => {
		router.push('/')
	}, [router])
	return (
		<HStack>
			<Spacer />
			<CircleIconButton
				color='gray.500'
				size={'lg'}
				tag='exit'
				arealabel='exit'
				handlePress={close ? close : handleClose}
			/>
		</HStack>
	)
}

export default ExitPage
