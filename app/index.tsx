import { Text } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import Page from '~features/layout/Page'
import Paralax from '~features/layout/Paralax'
import ScrollXGallery from '~features/layout/ImageSlide'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllInactive } from '~features/worries/worrySlice'

export default function Home() {
	return <Paralax />
}
