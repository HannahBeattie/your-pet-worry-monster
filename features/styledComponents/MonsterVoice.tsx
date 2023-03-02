import { StyledProps, Text } from 'native-base'
import React from 'react'

interface Props {
	children: React.ReactNode
	props?: StyledProps
	reg?: boolean
	light?: boolean
	sizeVal?: number | string
	color?: string
}

// #dc91f7

const MonsterVoice: React.FC<Props> = ({ children, props, reg, light, sizeVal, color }) => {
	const colorPropsOr = color ? color : '#aebdf5'
	const sizePropsOr = sizeVal ? sizeVal : '3xl'
	const weightPropsOr = reg ? 'monsterFont' : light ? 'monsterLight' : 'monsterBold'
	return (
		<Text fontSize={sizePropsOr} fontFamily={weightPropsOr} color={colorPropsOr} {...props}>
			{children}
		</Text>
	)
}

export default MonsterVoice
