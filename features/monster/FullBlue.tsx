import { Image } from 'native-base'
import React from 'react'

const excited = require('../../assets/fullBlue/excited.png')
const happy = require('../../assets/fullBlue/happy.png')
const sad = require('../../assets/fullBlue/sad.png')
const sleepy = require('../../assets/fullBlue/sleepy.png')
const upset = require('../../assets/fullBlue/upset.png')
const verySad = require('../../assets/fullBlue/verySad.png')
const yummy = require('../../assets/fullBlue/yummy.png')
const fuzzle = require('../../assets/fullBlue/fuzzle.png')

interface Props {
	monsterMood: string
}

const FullBlue: React.FC<Props> = ({ monsterMood }) => {
	let src
	switch (monsterMood) {
		case 'excited':
			src = excited
			break
		case 'happy':
			src = happy
			break
		case 'sad':
			src = sad
			break
		case 'sleepy':
			src = sleepy
			break
		case 'upset':
			src = upset
			break
		case 'verySad':
			src = verySad
			break
		case 'yummy':
			src = yummy
			break
		case 'fuzzle':
			src = fuzzle
			break
		default:
			src = happy
	}

	return <Image alt={'blue the monster'} source={src} flex={1} resizeMode='contain' />
}

export default FullBlue
