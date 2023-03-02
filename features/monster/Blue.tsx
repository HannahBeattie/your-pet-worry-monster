import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllActive } from '../worries/worrySlice'
import Puppet from './Puppet'

function Blue() {
	const currentWorries = useSelector(selectAllActive)
	return <Puppet numWorries={currentWorries.length} />
}

export default Blue
