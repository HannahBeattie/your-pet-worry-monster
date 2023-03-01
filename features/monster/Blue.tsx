import { Image } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllActive } from '../worries/worrySlice'

const noWorries = require('../../assets/blue.png')
const someWorries = require('../../assets/worrybags.png')

function Blue() {
	const currentWorries = useSelector(selectAllActive)
	return (
		<>
			{currentWorries.length === 0 && (
				<Image alt={'blue the monster'} source={noWorries} flex={1} resizeMode='contain' />
			)}
			{currentWorries.length > 0 && (
				<Image
					alt={'blue the monster'}
					source={someWorries}
					flex={1}
					resizeMode='contain'
				/>
			)}
		</>
	)
}

export default Blue
