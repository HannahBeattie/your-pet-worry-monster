import { Box, VStack } from 'native-base'
import { InterfaceVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { ComponentProps, FC, ReactElement, useRef, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	FadeIn,
	FadeInUp,
	FadeOut,
	FadeOutDown,
	FadingTransition,
	Layout,
	StyleProps,
	Transition,
	interpolate,
	measure,
	runOnJS,
	runOnUI,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'

const AVStack = Animated.createAnimatedComponent(VStack)

export type DragExpanderProps = ComponentProps<typeof VStack> & {
	expanded?: ReactElement
	initialHeight?: number
	_animated?: StyleProps
	_bg?: ComponentProps<typeof Box>
}

const snaps = {
	down: 250, // y location when not expanded
	escape: 20, // how far you have to drag before it flips to the other snap point
}

const DragExpander: FC<DragExpanderProps> = ({
	expanded,
	_animated,
	_bg,
	initialHeight,
	p,
	px,
	py,
	pl,
	pt,
	pr,
	pb,
	children,
	...rest
}) => {
	const padProps = { p, px, py, pl, pt, pr, pb }
	const refAlways = useAnimatedRef()
	const refExpanded = useAnimatedRef()

	const isUp = useSharedValue(false) // start out not-expanded
	const isPressed = useSharedValue(false) // we're actually not using this right now, but you could use it to adjust scale/etc based on if the user is currently pressing
	const alwaysH = useSharedValue(50) // this is used to store the height for the component when it isn't expanded
	const expandedH = useSharedValue(100) // this is used to store the height for the expanded part of the component
	const offY = useSharedValue(snaps.down) // y-location ("offset") for the components that are being animated
	const startY = useSharedValue(snaps.down) // y-location when the user started the pan gesture, used for internal computations in the gesture handlers
	const snapsUp = useDerivedValue(() => snaps.down - expandedH.value / 2)
	const animStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: offY.value }],
		}
	})

	const animStyleBg = useAnimatedStyle(() => {
		return {
			height: withSpring(
				interpolate(
					offY.value,
					[snaps.down - snaps.escape, snapsUp.value + snaps.escape],
					[alwaysH.value, alwaysH.value + expandedH.value],
					Extrapolation.CLAMP
				)
			),
		}
	})

	const animStyleExpanded = useAnimatedStyle(() => {
		const snapsHalf = (snaps.down - snapsUp.value) / 2 + snapsUp.value
		const visibility = interpolate(
			offY.value,
			[snapsHalf, snapsUp.value],
			[0, 1],
			Extrapolation.CLAMP
		)
		return {
			opacity: visibility,
			transform: [
				{
					scale: withSpring(visibility * 0.5 + 0.5),
				},
			],
		}
	})

	const gesture = Gesture.Pan()
		.activeOffsetY([-5, 5])
		.onBegin(() => {
			isPressed.value = true
			expandedH.value = measure(refExpanded).height
		})
		.onUpdate((e) => {
			// update y offset based on how far the user has dragged since the start of the gesture
			offY.value = e.translationY + startY.value
		})
		.onEnd(() => {
			// Now that the gesture has finished, we're going to snap to either the 'down' or the 'up' snap point
			// First, figure out how far we've dragged away from the current snap point
			const diff = isUp.value ? offY.value - snapsUp.value : snaps.down - offY.value
			if (diff > snaps.escape) {
				// We've dragged enough to escape the current snap, toggle isUp
				isUp.value = !isUp.value
			}
			// Choose our snap target based on the updated value of isUp
			const snapTo = isUp.value ? snapsUp.value : snaps.down
			// Spring to our snap target!
			offY.value = withSpring(snapTo)
			startY.value = withSpring(snapTo)
		})
		.onFinalize(() => {
			isPressed.value = false
		})

	return (
		<VStack alignItems='stretch' flex={1}>
			<GestureDetector gesture={gesture}>
				<Animated.View
					style={[animStyle, _animated, { display: 'flex', alignItems: 'stretch' }]}
				>
					<VStack
						alignItems='stretch'
						justifyContent='center'
						w='100%'
						position='relative'
						{...rest}
					>
						<Box
							// This is a view that renders the background behind the other components
							{..._bg}
							{...padProps}
							position='absolute'
							left={0}
							top={0}
							right={0}
						>
							<Animated.View style={[animStyleBg]} />
						</Box>
						<VStack alignItems='stretch' {...padProps}>
							<VStack
								alignItems='stretch'
								ref={refAlways}
								onLayout={({ nativeEvent }) => {
									runOnUI((height) => {
										'worklet'
										if (height > 0) {
											alwaysH.value = height
										}
									})(nativeEvent.layout.height)
								}}
							>
								{children}
							</VStack>
							<VStack alignItems='stretch' ref={refExpanded}>
								<Animated.View
									style={[animStyleExpanded, { display: 'flex', width: '100%' }]}
								>
									{expanded}
								</Animated.View>
							</VStack>
						</VStack>
					</VStack>
				</Animated.View>
			</GestureDetector>
		</VStack>
	)
}
export default DragExpander
