import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllActive } from '../worries/worrySlice'
import Puppet, { PuppetProps } from './puppet/Puppet'

function Blue(props: PuppetProps) {
	const currentWorries = useSelector(selectAllActive)
	return <Puppet {...props} numWorries={currentWorries.length} />
}

export default Blue
