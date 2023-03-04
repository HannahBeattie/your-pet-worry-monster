import { Image, VStack } from 'native-base'
import { useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	runOnUI,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { AnimStyleForPart, PartName, animStyleForPart, partNames, parts } from './puppetParts'

const aspect = 1.0 / 1.406 // width-to-height ratio for the full puppet

const baseGain = 0.33

function log(...args: any[]) {
	console.log(...args)
}

type PuppetProps = {
	numWorries?: number
}

export default function Puppet({ numWorries }: PuppetProps) {
	const [didLayout, setDidLayout] = useState(false)
	const [imgsLoaded, setImgsLoaded] = useState(0)

	const start = useSharedValue({ x: 0, y: 0 })
	const originX = useSharedValue(0)
	const originY = useSharedValue(0)
	const isPressed = useSharedValue(false)
	const press = useSharedValue({ x: 0, y: 0 })
	const originSpringX = useDerivedValue(() =>
		withSpring(originX.value, { stiffness: 300, damping: 20 })
	)
	const originSpringY = useDerivedValue(() =>
		withSpring(originY.value, { stiffness: 300, damping: 20 })
	)

	const layout = useSharedValue({ x: 0, y: 0, width: 1, height: 1 })

	const skipUpdate = useSharedValue(-1)
	const gesture = Gesture.Pan()
		.onBegin((evt) => {
			isPressed.value = true
			press.value = { x: evt.x, y: evt.y }
			originX.value = evt.translationX * baseGain + start.value.x
			originY.value = evt.translationY * baseGain + start.value.y
		})
		.onUpdate((evt) => {
			skipUpdate.value = (skipUpdate.value + 1) % 4
			if (skipUpdate.value > 0) {
				// try to improve performance by only processing every fourth event
				return
			}
			press.value = { x: evt.x, y: evt.y }
			originX.value = evt.translationX * baseGain + start.value.x
			originY.value = evt.translationY * baseGain + start.value.y
		})
		.onEnd((evt) => {
			isPressed.value = false
			originX.value = 0
			originY.value = 0
		})

	const animStyles: Partial<Record<PartName, AnimStyleForPart>> = {}
	for (const partName of partNames) {
		const part = parts[partName]
		animStyles[partName] = useAnimatedStyle(() => {
			return animStyleForPart({
				layout: layout.value,
				part,
				origin: { x: originX.value, y: originY.value },
				originSpring: { x: originSpringX.value, y: originSpringY.value },
				isPressed: isPressed.value,
				press: press.value,
			})
		})
	}

	return (
		<GestureDetector gesture={gesture}>
			<VStack
				flex={1}
				position='relative'
				onLayout={({ nativeEvent }) => {
					const ll = nativeEvent.layout
					const layoutAspect = ll.width / ll.height
					const imgLayout = { ...ll }
					if (layoutAspect > aspect) {
						// layout is wider than image
						imgLayout.width = ll.height * aspect
						imgLayout.x = (ll.width - imgLayout.width) / 2
					} else {
						imgLayout.height = ll.width / aspect
						imgLayout.y = (ll.height - imgLayout.height) / 2
					}
					setDidLayout(true)
					runOnUI((layoutVals) => {
						'worklet'
						layout.value = layoutVals
					})(imgLayout)
				}}
			>
				{didLayout && // don't render parts until initial layout is done
					partNames.map((partName) => {
						const { src, minWorries } = parts[partName]
						const allLoaded = imgsLoaded >= partNames.length ? 1 : 0
						const hasEnoughWorries = (numWorries ?? 0) >= (minWorries ?? 0)
						const opacity = allLoaded * (hasEnoughWorries ? 1 : 0)
						return (
							<Animated.View
								key={`part-${partName}`}
								style={[animStyles[partName], { position: 'absolute' }]}
							>
								<Image
									key={`img-part-${partName}`}
									alt={`blue's ${partName}`}
									source={src}
									flex={1}
									resizeMode='contain'
									onLoad={() => setImgsLoaded((prev) => prev + 1)}
									opacity={opacity}
								/>
							</Animated.View>
						)
					})}
			</VStack>
		</GestureDetector>
	)
}
