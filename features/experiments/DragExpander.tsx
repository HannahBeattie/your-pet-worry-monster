import { Entypo } from '@expo/vector-icons'
import { Box, Icon, VStack } from 'native-base'
import { ComponentProps, FC, ReactElement } from 'react'
import { TouchableOpacity } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	Extrapolation,
	FadeOutUp,
	Layout,
	interpolate,
	runOnUI,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

export type DragExpanderProps = ComponentProps<typeof VStack> & {
	header: ReactElement
	_bg?: ComponentProps<typeof Box>
	_container?: ComponentProps<typeof VStack>
	onDelete?: () => void
}

const snapEscape = 20 // distance that the user needs to drag to snap to the other position

const DragExpander: FC<DragExpanderProps> = ({
	header,
	_bg,
	_container,
	onDelete,
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
	const refHeader = useAnimatedRef()
	const refExpanded = useAnimatedRef()

	const isUp = useSharedValue(false) // start out not-expanded
	const isPressed = useSharedValue(false) // we're actually not using this right now, but you could use it to adjust scale/etc based on if the user is currently pressing
	const expanded = useSharedValue(0) // 0-to-1 animated value for whether we're expanded or not
	const expandedSpring = useDerivedValue(() =>
		withSpring(expanded.value, { stiffness: 250, damping: 21 })
	) // springy value for expanded
	const headerH = useSharedValue(200) // this stores the height of the header
	const expandedH = useSharedValue(200) // this stores the height for the expanded stuff (children)
	const snapDown = useDerivedValue(() => expandedH.value / 2) // y offset when not expanded
	const snapUp = useDerivedValue(() => 0) // y offset when expanded
	const offY = useSharedValue(snapDown.value) // y-location ("offset") for the components that are being animated
	const startY = useSharedValue(snapDown.value) // y-location when the user started the pan gesture, used for internal computations in the gesture handlers

	const DELETE_H = 70 // this stores the height for the delete button
	const deleteH = useSharedValue(DELETE_H) // this stores the height for the delete button
	const isUpUp = useSharedValue(false) // true when user hae double-expanded up to show delete button
	const upUp = useSharedValue(0) // 0-to-1 animated value for whether we're double-expanded or not
	const upUpSpring = useDerivedValue(() =>
		withSpring(upUp.value, { stiffness: 250, damping: 21 })
	) // springy upUp
	const snapUpUp = useDerivedValue(() => -deleteH.value) // y offset when expanded

	const tapGesture = Gesture.Tap().onStart(() => {
		// Toggle isUp (unless we're in delete mode, in which case hide delete)
		isUp.value = isUpUp.value || !isUp.value

		// Hide delete
		isUpUp.value = false
		upUp.value = 0

		// Choose our snap target based on the updated value of isUp
		const snapTo = isUp.value ? snapUp.value : snapDown.value
		// Update our 0-to-1 "expanded" value
		expanded.value = isUp.value ? 1 : 0
		// Spring to our snap target!
		offY.value = withSpring(snapTo)
		startY.value = withSpring(snapTo)
	})

	const panGesture = Gesture.Pan()
		.activeOffsetY([-5, 5])
		.onBegin(() => {
			isPressed.value = true
			startY.value = offY.value
		})
		.onUpdate((e) => {
			// update y offset based on how far the user has dragged since the start of the gesture
			offY.value = e.translationY + startY.value
			// update our 0-to-1 "expanded" animated value based on where we are between the snap points
			expanded.value = interpolate(
				offY.value,
				[snapDown.value, snapUp.value],
				[0, 1],
				Extrapolation.CLAMP
			)
			upUp.value = interpolate(
				offY.value,
				[snapUp.value, snapUpUp.value],
				[0, 1],
				Extrapolation.CLAMP
			)
		})
		.onEnd(() => {
			// Now that the gesture has finished, we're going to snap to either the 'down' or the 'up' snap point
			// First, handle the upUp double-expand for the delete button
			const upUpDiff = isUpUp.value ? offY.value - snapUpUp.value : snapUp.value - offY.value
			if (isUp.value && upUpDiff > snapEscape) {
				// We've dragged enough to escape the current snap, toggle isUp
				isUpUp.value = !isUpUp.value
			}
			// Next, figure out how far we've dragged away from the current snap point, and toggle isUp if we've got far enough
			const diff = isUp.value ? offY.value - snapUp.value : snapDown.value - offY.value
			if (diff > snapEscape) {
				// We've dragged enough to escape the current snap, toggle isUp
				isUp.value = !isUp.value
			}
			// Choose our snap target based on the updated value of isUp
			const snapTo = isUpUp.value
				? snapUpUp.value
				: isUp.value
				? snapUp.value
				: snapDown.value
			// Update our 0-to-1 "expanded" value
			expanded.value = isUp.value ? 1 : 0
			upUp.value = isUpUp.value ? 1 : 0
			// Spring to our snap target!
			offY.value = withSpring(snapTo)
			startY.value = withSpring(snapTo)
		})
		.onFinalize(() => {
			isPressed.value = false
		})

	const gesture = Gesture.Race(tapGesture, panGesture)

	// animStyle moves the whole component
	const animStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: offY.value }],
		}
	})

	// animStyleBg controls the height of the background
	const animStyleBg = useAnimatedStyle(() => {
		return {
			height: withSpring(
				interpolate(
					expanded.value,
					[0.2, 0.7],
					[headerH.value, headerH.value + expandedH.value],
					Extrapolation.CLAMP
				),
				{ stiffness: 300, damping: 20 }
			),
		}
	})

	// animStyleExpanded controls the styling of the content that is only visible when expanded
	const animStyleExpanded = useAnimatedStyle(() => {
		const visibility = interpolate(expandedSpring.value, [0.75, 1], [0, 1])
		const scale = interpolate(expandedSpring.value, [0.75, 1], [0.5, 1])
		return {
			opacity: visibility,
			transform: [{ scale }],
		}
	})

	// animStyleDelete controls the styling of the delete button
	const animStyleDelete = useAnimatedStyle(() => {
		const visibility = interpolate(upUpSpring.value, [0.75, 1], [0, 1])
		const scale = interpolate(upUpSpring.value, [0.75, 1], [0.5, 1])
		return {
			opacity: visibility,
			transform: [{ translateY: -offY.value }, { scale }],
		}
	})

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				exiting={FadeOutUp.duration(200)}
				layout={Layout.delay(200).duration(300)}
				style={[animStyle, { display: 'flex', alignItems: 'stretch' }]}
			>
				<VStack
					alignItems='stretch'
					justifyContent='center'
					w='100%'
					position='relative'
					{..._container}
				>
					<VStack
						// This view renders the delete button -- it's first here so
						// that it renders underneath everything else
						position='absolute'
						alignItems='center'
						bottom={0}
						left={0}
						right={0}
					>
						<Animated.View style={[animStyleDelete]}>
							<TouchableOpacity
								onPress={onDelete}
								accessibilityRole='button'
								accessibilityLabel='delete'
							>
								<Icon
									as={Entypo}
									name='circle-with-cross'
									color='red.500'
									size='4xl'
								/>
							</TouchableOpacity>
						</Animated.View>
					</VStack>

					<VStack
						// This view renders the background behind the content
						{..._bg}
						{...padProps}
						position='absolute'
						alignItems='stretch'
						left={0}
						top={0}
						right={0}
					>
						<Animated.View style={[animStyleBg]} />
					</VStack>

					<VStack
						alignItems='stretch'
						{...padProps}
						{...rest}
						// This view contains the content -- the header and children
					>
						<VStack
							// This view contains the "header" and is always displayed
							alignItems='stretch'
							ref={refHeader}
							onLayout={({ nativeEvent }) => {
								// Set the "headerH" value now that we know how big it is
								runOnUI((height) => {
									'worklet'
									if (height > 0) {
										headerH.value = height
									}
								})(nativeEvent.layout.height)
							}}
						>
							{header}
						</VStack>
						<VStack
							// this view contains content that is only displayed when expanded
							alignItems='stretch'
							ref={refExpanded}
							onLayout={({ nativeEvent }) => {
								// Set the "expandedH" value now that we know how big it is
								// and update "offY" to center the component
								runOnUI((height) => {
									'worklet'
									if (height > 0) {
										expandedH.value = height
										expanded.value = 0
										offY.value = height / 2
									}
								})(nativeEvent.layout.height)
							}}
						>
							<Animated.View
								style={[animStyleExpanded, { display: 'flex', width: '100%' }]}
							>
								{children}
							</Animated.View>
						</VStack>
					</VStack>
				</VStack>
			</Animated.View>
		</GestureDetector>
	)
}
export default DragExpander
