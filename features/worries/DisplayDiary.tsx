import { VStack } from 'native-base'
import React from 'react'
import WorryFeature from '~features/experiments/WorryFeature'
import ImageSlide from '~features/styledComponents/ImageSlide'
import PageWrapper from '~features/styledComponents/PageWrapper'
const spatter = require('../../assets/spatter01.png')
const spatter2 = require('../../assets/spatter02.png')
const spatter3 = require('../../assets/spatter03.png')
function DisplayDiary() {
	const imageArray = [spatter, spatter2, spatter3, spatter, spatter2, spatter3]
	return (
		<PageWrapper py={-2} px={-1}>
			<WorryFeature />
		</PageWrapper>
	)
}

export default DisplayDiary
