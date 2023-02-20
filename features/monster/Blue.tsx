import { Image } from 'native-base'
import React from 'react'

const gregoryBlue = require('../../assets/blue.png')
function Blue() {
	return <Image alt={'blue the monster'} source={gregoryBlue} flex={1} resizeMode='contain' />
}

export default Blue
