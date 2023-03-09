import { Image } from 'native-base'
import { LayoutRectangle } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Part, Pos } from './puppetParts'
import { animStyleForPart, useAnimatedPartProps } from './animStyleForPart'

type AnimProps = {
	layout: SharedValue<LayoutRectangle>
	originX: SharedValue<number>
	originY: SharedValue<number>
	originSpringX: SharedValue<number>
	originSpringY: SharedValue<number>
	isPressed: SharedValue<boolean>
	press: SharedValue<Pos>
}

type PuppetPartProps = {
	part: Part
	zIndex?: number
	allLoaded: boolean
	numWorries?: number
	offScreen?: boolean
	animProps: AnimProps
	onLoad: () => void
}

export default function PuppetPart({ part, zIndex, ...props }: PuppetPartProps) {
	const { allLoaded, numWorries, offScreen, animProps, onLoad } = props
	const { name: partName, src, minWorries, subparts, subpartsUnder } = part
	const hasEnoughWorries = (numWorries ?? 0) >= (minWorries ?? 0)
	const opacity = allLoaded && hasEnoughWorries ? 1 : 0

	const { rotate } = useAnimatedPartProps({ part })
	const animStyle = useAnimatedStyle(() => {
		const { layout, originX, originY, originSpringX, originSpringY, isPressed, press } =
			animProps
		return animStyleForPart({
			layout: layout.value,
			part,
			origin: { x: originX.value, y: originY.value },
			originSpring: { x: originSpringX.value, y: originSpringY.value },
			isPressed: isPressed.value,
			press: press.value,
			offScreen: offScreen || !allLoaded,
			rotate: rotate.value,
		})
	})

	return (
		<Animated.View key={`part-${partName}`} style={[animStyle, { position: 'absolute' }]}>
			{subpartsUnder?.map((part) => (
				<PuppetPart key={`puppet-part-${part.name}`} part={part} {...props} />
			))}
			<Image
				key={`img-part-${partName}`}
				alt={`Blue's ${partName}`}
				source={src}
				flex={1}
				resizeMode='contain'
				onLoad={onLoad}
				opacity={opacity}
			/>
			{subparts?.map((part) => (
				<PuppetPart key={`puppet-part-${part.name}`} part={part} {...props} />
			))}
		</Animated.View>
	)
}
