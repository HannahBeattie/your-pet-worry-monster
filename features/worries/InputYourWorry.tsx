import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import WorryInput from '~features/styledComponents/WorryInput'
import { Worry, WorryField, addWorry } from './worrySlice'

const inputItems = [
	{
		name: 'description' as WorryField,
		question: 'I am worried...',
		placeholder: 'very scary thing',
		nextButtonText: 'I can feel this worry...',
		required: true,
		onValidate: (value?: string) => {
			if (!value?.length) {
				return 'No worries?'
			}
		},
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

	// worryNum is a counter that increments the react key for the worry inputs
	// so that fresh inputs are rendered after submitting/closing a worry
	const [worryNum, setWorryNum] = useState(0)

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

	const resetInputs = useCallback(() => {
		// Wait a second for the new route to render, then reset the inputs
		// (we need to wait because otherwise the inputs onBlur functions get called)
		setTimeout(() => {
			setNewWorry({})
			whichInput(0)
			setWorryNum(worryNum + 1)
		}, 100)
	}, [worryNum])

	const onClose = useCallback(() => {
		router.push('/monsterMenu')
		resetInputs()
	}, [resetInputs])

	const onSubmit = useCallback(() => {
		// "trim" fields to remove spaces/newlines from the start and end
		const worryToAdd = { ...newWorry }
		for (const { name: field } of inputItems) {
			const value = worryToAdd[field]
			worryToAdd[field] = value?.trim()
		}
		dispatch(addWorry(worryToAdd as Worry))
		router.push('/savingWorry')
		resetInputs()
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

	const { name, ...rest } = inputItems[input]

	return (
		<WorryInput
			key={`input-${worryNum}-${input}`}
			{...sharedInputProps({ name, input })}
			{...rest}
		/>
	)
}
