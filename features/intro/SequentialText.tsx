import { Center, Text } from 'native-base'
import React, { ReactNode, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import FullBlue from '~features/monster/FullBlue'
import MonsterVoice from '~features/styledComponents/MonsterVoice'

interface Props {
	textArray?: string[]
	handleLast?: any
	secSqnce?: string[]
	children?: ReactNode
}

const SequentialText: React.FC<Props> = ({ textArray, children, handleLast }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [currentText, setCurrentText] = useState<string | null>(null)
	const [firstSequenceFinished, setFirstSequenceFinished] = useState(false)

	const handleReplay = () => {
		setCurrentIndex(0)
		//set redux state of intro component
	}

	useEffect(() => {
		const currentItem = textArray && textArray[currentIndex]
		if (!currentItem) {
			setCurrentText(null)
			return
		}

		let intervalId: NodeJS.Timeout

		const startTyping = () => {
			let i = 0
			setCurrentText('')
			intervalId = setInterval(() => {
				const nextChar = currentItem[i]
				setCurrentText((prevText) => prevText + nextChar)
				i++
				if (i === currentItem.length) {
					clearInterval(intervalId)
					setTimeout(() => {
						setCurrentText('')
						setTimeout(() => {
							setCurrentIndex((prevIndex) => prevIndex + 1)
						}, 500)
					}, 1000)
				}
			}, 150)
		}

		setTimeout(startTyping, 500)
		return () => clearInterval(intervalId)
	}, [textArray, currentIndex])

	const handleFirstSequenceFinish = () => {
		setFirstSequenceFinished(true)
	}

	return (
		<>
			<Center>
				<MonsterVoice>{currentText}</MonsterVoice>
			</Center>
			{currentText === null &&
				currentIndex === textArray?.length &&
				!firstSequenceFinished && (
					<TouchableOpacity onPress={handleLast}>
						<Center>{children}</Center>
					</TouchableOpacity>
				)}
		</>
	)
}

export default SequentialText
