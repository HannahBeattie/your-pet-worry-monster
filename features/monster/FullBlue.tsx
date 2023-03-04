import { Image } from 'native-base'
import React from 'react'

const imageSources = {
	excited: require('../../assets/fullBlue/excited.png'),
	happy: require('../../assets/fullBlue/happy.png'),
	sad: require('../../assets/fullBlue/sad.png'),
	sleepy: require('../../assets/fullBlue/sleepy.png'),
	upset: require('../../assets/fullBlue/upset.png'),
	verySad: require('../../assets/fullBlue/verySad.png'),
	yummy: require('../../assets/fullBlue/yummy.png'),
	fuzzle: require('../../assets/fullBlue/fuzzle.png'),
	hmmm: require('../../assets/fullBlue/hmmm.png'),
	hungry: require('../../assets/fullBlue/hungry.png'),
	idea: require('../../assets/fullBlue/idea.png'),
	yayay: require('../../assets/fullBlue/yayay.png'),
	sneak: require('../../assets/fullBlue/sneak.png'),
	great: require('../../assets/fullBlue/great.png'),
}

type MonsterMood = keyof typeof imageSources

interface Props {
	monsterMood: MonsterMood
}

const FullBlue: React.FC<Props> = ({ monsterMood }) => {
	const src: number = imageSources[monsterMood] || imageSources['happy']

	return <Image alt={'blue the monster'} source={src} flex={1} resizeMode='contain' />
}

export default FullBlue
