import { AntDesign } from '@expo/vector-icons'
import { Container, Heading, HStack, Icon, IconButton, Spacer, VStack } from 'native-base'
import React, { useState } from 'react'
import { LayoutAnimation, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import Swipeable, { SwipeableProps } from 'react-native-gesture-handler/Swipeable'

interface Props extends SwipeableProps {
	title: string
	children: React.ReactNode
}

const Collapsible: React.FC<Props> = ({
	title,
	children,

	...rest
}) => {
	const { height, width } = useWindowDimensions()
	const [expanded, setExpanded] = useState(false)

	const toggleExpanded = () => {
		console.log(`expanded is ${expanded}`)
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setExpanded(!expanded)
	}

	const onSwipeUp = () => {
		console.log(`expanded is ${expanded}`)
		// LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		// setExpanded(expanded)
		toggleExpanded()
	}

	const onSwipeDown = () => {
		console.log(`expanded is ${expanded}`)
		// LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		// setExpanded(!expanded)
		toggleExpanded()
	}

	const onSwipeLeft = () => {
		console.log(`expanded is ${expanded}`)
		// LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		// setExpanded(!expanded)
		toggleExpanded()
	}

	const onSwipeHandler = (event: any) => {
		console.log(`expanded is ${expanded}`)
		if (event.nativeEvent.velocity.y > 0) {
			onSwipeDown && onSwipeDown()
			toggleExpanded()
		} else {
			onSwipeUp && onSwipeUp()
			toggleExpanded()
		}

		// if (event.nativeEvent.velocity.x > 0) {
		// 	onSwipeLeft && onSwipeLeft()
		// 	toggleExpanded()
		// }
	}

	return (
		<Swipeable
			{...rest}
			onSwipeableClose={toggleExpanded}
			onSwipeableOpen={toggleExpanded}
			overshootFriction={8}
			overshootLeft={false}
			overshootRight={false}
			onSwipeableWillOpen={onSwipeHandler}
		>
			<VStack
				minW={width}
				minH={height}
				maxW={width}
				maxH={height}
				justifyContent={'center'}
				px={expanded ? 0 : 8}
			>
				<Pressable onPress={expanded ? null : toggleExpanded}>
					<VStack backgroundColor={'gray.200'} px={8} borderRadius={expanded ? 0 : 20}>
						<VStack mt={expanded ? 240 : 4} mb={expanded ? 8 : 4} space={8}>
							<Heading textAlign={'center'} color={'black'}>
								{title}
							</Heading>
						</VStack>
					</VStack>
				</Pressable>

				{expanded && (
					<VStack
						backgroundColor={'gray.200'}
						width={width}
						height={height}
						justifyContent={'space-around'}
					>
						<Container px={8}>{children}</Container>

						<HStack pb={16} px={6}>
							<Spacer />
							<IconButton
								alignSelf={'center'}
								p={0}
								onPress={toggleExpanded}
								icon={
									<Icon
										as={AntDesign}
										size={'6'}
										name='closecircle'
										color={'gray.900'}
									/>
								}
								borderRadius='full'
							/>
						</HStack>
					</VStack>
				)}
			</VStack>
		</Swipeable>
	)
}

export default Collapsible
