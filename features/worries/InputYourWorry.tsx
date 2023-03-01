import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import WorryInput from '~features/layout/WorryInput'
import { Worry, WorryField, addWorry } from './worrySlice'

const inputItems = [
	{
		name: 'description' as WorryField,
		question: 'I am worried...',
		placeholder: 'very scary thing',
		nextButtonText: 'I can feel this worry...',
	},
	{
		name: 'sensation' as WorryField,
		question: 'I can feel this worry...',
		placeholder: 'somewhere in your body',
		nextButtonText: 'The scariest bit is...',
	},
	{
		name: 'extraNote' as WorryField,
		question: 'The scariest bit is...',
		placeholder: 'terribly scary thing',
	},
]

export default function InputYourWorry() {
	const [input, whichInput] = useState(0)
	const [newWorry, setNewWorry] = useState<Partial<Worry>>({})
	const dispatch = useDispatch()
	const router = useRouter()

	const onChangeText = useCallback(
		(name: WorryField, value: string) => {
			// console.log(`${name} => ${value}`)
			const update: Partial<Worry> = newWorry.id
				? { ...newWorry }
				: {
						id: +new Date(),
						isActive: true,
				  }
			update[name] = value
			setNewWorry(update)
		},
		[newWorry]
	)

	const onClose = useCallback(() => {
		setNewWorry({})
		whichInput(0)
		router.push('/monsterMenu')
	}, [])

	const onSubmit = useCallback(() => {
		// "trim" fields to remove spaces/newlines from the start and end
		const worryToAdd = { ...newWorry }
		for (const { name: field } of inputItems) {
			const value = worryToAdd[field]
			worryToAdd[field] = value?.trim()
		}
		dispatch(addWorry(worryToAdd as Worry))
		onClose()
	}, [newWorry, onClose])

	const sharedInputProps = ({ name, input }: { name: WorryField; input: number }) => ({
		onChangeText,
		onSubmit,
		onClose,
		name,
		value: newWorry[name],
		onNextButtonPress: () => whichInput(input + 1),
		input,
	})

	const { name, question, placeholder, nextButtonText } = inputItems[input]

	return (
		<WorryInput
			key={`input-${input}`}
			{...sharedInputProps({ name, input })}
			question={question}
			placeholder={placeholder}
			nextButtonText={nextButtonText}
		/>
	)
}
