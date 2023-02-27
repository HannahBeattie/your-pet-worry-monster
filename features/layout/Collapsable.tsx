import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import {
	Box,
	Button,
	Card,
	Center,
	Container,
	Heading,
	Icon,
	IconButton,
	Spacer,
	VStack,
} from 'native-base'
import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	LayoutAnimation,
	useWindowDimensions,
} from 'react-native'

interface Props {
	title: string
	children: React.ReactNode
}

const Collapsible: React.FC<Props> = ({ title, children }) => {
	const { height, width } = useWindowDimensions()
	const [expanded, setExpanded] = useState(false)

	const toggleExpanded = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setExpanded(!expanded)
	}

	return (
		<VStack
			minW={width}
			minH={height}
			maxW={width}
			maxH={height}
			justifyContent={'center'}
			px={expanded ? 0 : 8}
		>
			<VStack backgroundColor={'gray.200'} px={8}>
				<VStack mt={expanded ? 240 : 4} mb={expanded ? 8 : 4} space={8}>
					<IconButton
						alignSelf={'center'}
						p={0}
						onPress={toggleExpanded}
						icon={
							expanded ? (
								<Icon
									as={AntDesign}
									size={'8'}
									name='closecircle'
									color={'gray.900'}
								/>
							) : (
								<Icon
									size={'8'}
									as={MaterialIcons}
									name='more-horiz'
									color={'gray.900'}
								/>
							)
						}
						borderRadius='full'
					/>
					<Heading textAlign={'center'} color={'black'}>
						{title}
					</Heading>
				</VStack>
			</VStack>

			{expanded && (
				<VStack
					backgroundColor={'gray.200'}
					minW={width}
					minH={height}
					maxW={width}
					maxH={height}
					px={8}
					py={10}
				>
					<Container>{children}</Container>
				</VStack>
			)}
		</VStack>
	)
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#e5e5e5',
		flex: 1,
	},
})

export default Collapsible
