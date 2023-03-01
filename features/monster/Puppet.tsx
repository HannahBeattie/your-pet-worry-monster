import { Image, VStack } from 'native-base'
import Animated, { runOnUI, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const noWorries = require('../../assets/blue.png')

const aspect = 1.0 / 1.406 // width-to-height ratio for the full puppet

type Part = {
	src: any
	left: number
	w: number
	top: number
	h: number
	rot?: number
}

type PartName =
	| 'legL'
	| 'legR'
	| 'armL'
	| 'armR'
	| 'body'
	| 'head'
	| 'mouth'
	| 'eyes'
	| 'pupilL'
	| 'pupilR'

const partNames = [
	'legL',
	'legR',
	'armL',
	'armR',
	'body',
	'head',
	'mouth',
	'eyes',
	'pupilL',
	'pupilR',
] as PartName[]

const parts: Record<PartName, Part> = {
	legL: {
		src: require('../../assets/monsterParts/leg-left.png'),
		left: 0.60978,
		w: 0.1859,
		top: 0.74903,
		h: 0.19353,
	},
	legR: {
		src: require('../../assets/monsterParts/leg-right.png'),
		left: 0.30369,
		w: 0.16587,
		top: 0.73563,
		h: 0.22488,
	},
	armL: {
		src: require('../../assets/monsterParts/arm-left.png'),
		left: 0.63862,
		w: 0.28606,
		top: 0.40273,
		h: 0.21918,
		rot: 180,
	},
	armR: {
		src: require('../../assets/monsterParts/arm-right.png'),
		left: 0.02,
		w: 0.43029,
		top: 0.43868,
		h: 0.20008,
		rot: 164,
	},
	body: {
		src: require('../../assets/monsterParts/body.png'),
		left: 0,
		w: 1,
		top: 0,
		h: 1,
	},
	head: {
		src: require('../../assets/monsterParts/head-blank.png'),
		left: 0.20873,
		w: 0.56611,
		top: 0.04731,
		h: 0.33746,
	},
	mouth: {
		src: require('../../assets/monsterParts/mouth-pleased.png'),
		left: 0.32051,
		w: 0.38061,
		top: 0.27618,
		h: 0.10289,
	},
	eyes: {
		src: require('../../assets/monsterParts/eyes-blank.png'),
		left: 0.26482,
		w: 0.44311,
		top: 0.14479,
		h: 0.14564,
	},
	pupilL: {
		src: require('../../assets/monsterParts/pupil-left.png'),
		left: 0.59736,
		w: 0.05689,
		top: 0.19125,
		h: 0.04019,
	},
	pupilR: {
		src: require('../../assets/monsterParts/pupil-right.png'),
		left: 0.33854,
		w: 0.0625,
		top: 0.20607,
		h: 0.04275,
	},
}

export default function Puppet() {
	const layout = useSharedValue({ x: 0, y: 0, width: 1, height: 1 })
	const animStyles: Partial<Record<PartName, any>> = {}
	for (const partName of partNames) {
		const part = parts[partName]
		animStyles[partName] = useAnimatedStyle(() => {
			const ll = layout.value
			return {
				transform: part.rot ? [{ rotate: `${part.rot}deg` }] : undefined,
				left: ll.x + ll.width * part.left,
				width: ll.width * part.w,
				top: ll.y + ll.height * part.top,
				height: ll.height * part.h,
			}
		})
	}
	return (
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
				console.log(layoutAspect, aspect, nativeEvent.layout, imgLayout)
				runOnUI((layoutVals) => {
					'worklet'
					layout.value = layoutVals
				})(imgLayout)
			}}
		>
			<Image
				position='absolute'
				width='full'
				height='full'
				left={0}
				top={0}
				right={0}
				bottom={0}
				opacity={0.1}
				alt={'blue the monster'}
				source={noWorries}
				flex={1}
				resizeMode='contain'
			/>
			{partNames.map((partName) => {
				const { src } = parts[partName]
				return (
					<Animated.View
						key={`part-${partName}`}
						style={[animStyles[partName], { position: 'absolute' }]}
					>
						<Image alt={`blue's ${partName}`} source={src} flex={1} />
					</Animated.View>
				)
			})}
		</VStack>
	)
}
