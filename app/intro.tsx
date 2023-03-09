import { Center, Pressable, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import Animated, {
	Easing,
	FadeInRight,
	FadeOutLeft,
	FadeOutRight,
	Layout,
	SlideInRight,
	SlideInUp,
	SlideOutLeft,
	SlideOutRight,
	interpolate,
	runOnJS,
	runOnUI,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { setIntroPlayed } from '~features/intro/introSlice'
import Blue from '~features/monster/Blue'
import Gregory from '~features/monster/Gregory'
import MonsterVoice from '~features/styledComponents/MonsterVoice'
import NameLabel from '~features/styledComponents/NameLabel'

// !!STATE1 && ---- viewtype one
// fade in from black, center screen ------vibrate phone
//'GRRR!', 'ROAR', 'GROWLLLLL!', 'I am the dreaded....'

// layout changes ----- //text appears at top of page //

//"WORRY MONSTER!!" ---- viewtype two

// Gregory blue appears, smiling

//text sequence continues above him :

// "I like to eat worries!"
// "Delicious!"
// "My name is..."
// "Wait!"

// Gregory looks sad/confused

//text sequence continues above him :

// "I don't have a name!"
// "I can't be a fearsome worry monster without a name!"

//SET STATE : ONE PLAYED
//link to '/name' which is followed by '/confirm name'

// STATEONE & !!STATE2 &&  :

// text sequence continues above gregory:

// "*GURGLE GURLGE*" ----vibrate phone?
// "I am hungry!"
// "Do you have any worries for me to eat?"

// buttons appear :
// ADD WORRY ---- '/addWorry'  === intro played
// MAYBE LATER --- '/' === intro played

// ELSE REG HOME SCREEN

function intro() {
	const dispatch = useDispatch()
	const [step, setStep] = useState(0)

	useEffect(() => {
		// Do something when any of the state values change
		console.log('step:', step)
	}, [step])

	const introPlayed = () => dispatch(setIntroPlayed(true))

	// const nextStep = useCallback(() => setStep((prev) => (prev + 1) % 4), [])

	const grrTx = useSharedValue(-1)
	const grrRot = useSharedValue(0)
	const doGrr = useCallback(() => {
		grrTx.value = withSequence(
			withTiming(1, { duration: 2000, easing: Easing.linear }),
			withTiming(0)
		)
		grrRot.value = withSequence(
			withTiming(-5, { duration: 50 }),
			withRepeat(withTiming(0.1, { duration: 30 }), 4, true),
			withRepeat(withTiming(0.2, { duration: 35 }), 4, true),
			withRepeat(withTiming(0.3, { duration: 40 }), 2, true),
			withRepeat(withTiming(0.5, { duration: 42 }), 2, true),
			withRepeat(withTiming(0.6, { duration: 45 }), 2, true),
			withRepeat(withTiming(0.6, { duration: 47 }), 2, true),
			withRepeat(withTiming(0.55, { duration: 40 }), 10, true),
			withRepeat(withTiming(0.5, { duration: 30 }), 10, true),
			withTiming(0, { duration: 50 }, () => {
				runOnJS(setStep)(1)
			}),
			withTiming(0, { duration: 1000 }, () => {
				runOnJS(setStep)(2)
			}),
			withTiming(0, { duration: 1000 }, () => {
				runOnJS(setStep)(3)
			}),
			withTiming(0, { duration: 500 }),
			withTiming(-3, { duration: 50 }),
			withRepeat(withTiming(3, { duration: 100 }), 4, true),
			withTiming(0, { duration: 50 })
		)
	}, [grrRot])

	useEffect(() => {
		doGrr()
	}, [doGrr])

	const grrAnim = useAnimatedStyle(() => {
		const tx = interpolate(grrTx.value, [-1, 1], [-200, 200])
		return {
			transform: [{ translateX: tx }, { rotate: `${grrRot.value}deg` }, { translateX: -tx }],
		}
	})

	return (
		<>
			{/* view type one: */}
			{/* <Center flex={1} bg={'black'}> */}
			<VStack flex={1} bg={'black'} alignItems='stretch'>
				<Pressable
					onPress={() => {
						switch (step) {
							case 0: // we're back at the start
								doGrr()
							case 3: // sequence finished, go back to start
								setStep(0)
							default:
								return
						}
					}}
					alignSelf='center'
					display='flex'
					alignItems='center'
					justifyContent='center'
					flexDir='column'
					// mt={8}
					// h={32}
					// mb={-16}
					flex={1}
				>
					{step < 2 && (
						<Animated.View
							key='grr'
							style={[grrAnim]}
							entering={SlideInRight.delay(300)}
							exiting={SlideOutLeft}
							// layout={Layout}
						>
							<MonsterVoice sizeVal={'8xl'} color='blueGray.200'>
								GRRRR!
							</MonsterVoice>
						</Animated.View>
					)}
					{step === 3 && (
						<Animated.View
							key='im-a-worry'
							style={[grrAnim]}
							entering={SlideInRight.delay(500)}
							exiting={SlideOutLeft}
							// layout={Layout}
						>
							<MonsterVoice sizeVal={'4xl'} color='blueGray.200'>
								I'm a worry monster!
							</MonsterVoice>
						</Animated.View>
					)}
				</Pressable>
				<VStack alignItems='stretch' flex={2} mx={8}>
					<Blue offScreen={step === 0} offScreenDir='bottom' numWorries={0} />
				</VStack>
			</VStack>
			{/* view type two: */}
			{/* <VStack flex={'1'} backgroundColor={'black'}>
				<SafeAreaView style={{ flex: 1 }}>
					<VStack flex={1}>
						<Center pt={12} px={8}>
							<MonsterVoice>I like to eat worries!</MonsterVoice>
						</Center>
						<Blue />
					</VStack>
				</SafeAreaView>
			</VStack> */}
		</>
	)
}

export default intro
