import Fontisto from '@expo/vector-icons/Fontisto'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { Icon, IconButton, StyledProps, VStack, Text, Center } from 'native-base'
import React from 'react'

interface Props {
	props?: StyledProps
	color?: string
	bg?: string
	handlePress?: () => void
	label?: string
	arealabel: string
	labelProps?: any
	tag?: string
}

const icons = [
	{ tag: 'tick', icon: Feather, name: 'check' },
	{ tag: 'home', icon: Fontisto, name: 'home' },
	{ tag: 'add', icon: Ionicons, name: 'add-circle-sharp' },
	{ tag: 'feed', icon: MaterialCommunityIcons, name: 'food-drumstick' },
	{ tag: 'dontFeed', icon: MaterialCommunityIcons, name: 'food-drumstick-off' },
]

const CircleIconButton: React.FC<Props> = ({
	handlePress,
	color,
	bg,
	tag,
	label,
	arealabel,
	labelProps,
}) => {
	const checkColor = color ? color : 'violet.400'
	const checkBg = bg ? bg : 'transparent'

	const selectedIcon = icons.find((iconObj) => iconObj.tag === tag)
	const IconComponent = selectedIcon?.icon || Feather
	const iconName = selectedIcon?.name || 'check'

	return (
		<Center>
			<IconButton
				onPress={handlePress}
				backgroundColor={checkBg}
				borderRadius={'200'}
				icon={<Icon size={'xl'} color={checkColor} as={IconComponent} name={iconName} />}
				accessibilityLabel={arealabel}
			/>
			{label && <Text {...labelProps}>{label}</Text>}
		</Center>
	)
}

export default CircleIconButton
