import Fontisto from '@expo/vector-icons/Fontisto'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { Icon, IconButton, StyledProps, VStack, Text, Center } from 'native-base'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'

interface Props {
	props?: StyledProps
	color?: string
	bg?: string
	handlePress?: () => void
	label?: string
	arealabel: string
	labelProps?: any
	tag?: string
	stackProps?: StyledProps
	size?: string | number
}

const icons = [
	{ tag: 'exit', icon: Entypo, name: 'circle-with-cross' },
	{ tag: 'yes', icon: Feather, name: 'check' },
	{ tag: 'home', icon: Fontisto, name: 'home' },
	{ tag: 'add', icon: Ionicons, name: 'add-circle-sharp' },
	{ tag: 'feed', icon: MaterialCommunityIcons, name: 'food-drumstick' },
	{ tag: '!feed', icon: MaterialCommunityIcons, name: 'food-drumstick-off' },
	{ tag: 'no', icon: Entypo, name: 'cross' },
	{ tag: 'right', icon: AntDesign, name: 'arrowright' },
]

const CircleIconButton: React.FC<Props> = ({
	handlePress,
	color,
	bg,
	tag,
	label,
	arealabel,
	labelProps,
	stackProps,
	size,
}) => {
	const checkColor = color ? color : 'violet.400'
	const checkBg = bg ? bg : 'transparent'
	const checkSize = size ? size : '5xl'
	const selectedIcon = icons.find((iconObj) => iconObj.tag === tag)
	const IconComponent = selectedIcon?.icon || Feather
	const iconName = selectedIcon?.name || 'check'

	return (
		<VStack
			alignItems={'stretch'}
			justifyContent={'center'}
			justifyItems={'center'}
			{...stackProps}
		>
			<Center>
				<IconButton
					onPress={handlePress}
					backgroundColor={checkBg}
					borderRadius={'200'}
					icon={
						<Icon
							size={checkSize}
							color={checkColor}
							as={IconComponent}
							name={iconName}
						/>
					}
					accessibilityLabel={arealabel}
				/>
			</Center>
			{label && (
				<Center>
					<Text fontSize={'lg'} color={'gray.500'} textAlign={'center'} {...labelProps}>
						{label}
					</Text>
				</Center>
			)}
		</VStack>
	)
}

export default CircleIconButton
