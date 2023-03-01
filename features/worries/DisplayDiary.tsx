import { VStack } from 'native-base'
import React from 'react'
import WorryFeature from '~features/experiments/WorryFeature'
import ImageSlide from '~features/layout/ImageSlide'
const spatter = require('../../assets/spatter01.png')
const spatter2 = require('../../assets/spatter02.png')
const spatter3 = require('../../assets/spatter03.png')
function DisplayDiary() {
	const imageArray = [spatter, spatter2, spatter3, spatter, spatter2, spatter3]
	return (
		<VStack backgroundColor={'gray.900'} flex={1}>
			<WorryFeature />
		</VStack>
	)
}

export default DisplayDiary
