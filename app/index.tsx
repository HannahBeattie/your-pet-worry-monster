import React from 'react'
import { useSelector } from 'react-redux'
import Page from '~features/layout/Page'
import ScrollXGallery from '~features/layout/ScrollXGallery'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'

export default function Home() {
	let worryData = useSelector(selectAllInactive).reverse()
	let entries = worryData.map(function (value) {
		return {
			time: useFormatDate(value.id),
			title: value.description,
			description: value.extraNote,
		}
	})

	const images = [
		require('../assets/spatter01.png'),
		require('../assets/spatter02.png'),
		require('../assets/spatter03.png'),
	]

	return (
		<Page>
			{/* <Options /> */}
			{/* <Gregory /> */}
			<ScrollXGallery imageArray={images} />
			<ScrollXGallery worryArray={entries} />
			<ScrollXGallery imageArray={images} />
		</Page>
	)
}
