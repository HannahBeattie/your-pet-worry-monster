import { Button, Center, FormControl, Input, VStack } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function BuildingAFormExample() {
	const [formData, setData] = React.useState('')
	const [two, setTwo] = React.useState('')
	const [errors, setErrors] = React.useState({})

	const validate = () => {
		if (formData === undefined) {
			setErrors({ ...errors, name: 'Name is required', age: 'age is cool' })
			return false
		} else if (formData.length < 3) {
			setErrors({ ...errors, name: 'Name is too short', age: 'age is dope' })
			return false
		}

		return true
	}

	const onSubmit = () => {
		validate() ? console.log('Submitted') : console.log('Validation Failed')
		setTwo('')
		setData('')
	}

	return (
		<KeyboardAwareScrollView width='90%' mx='3' maxW='300px'>
			<FormControl isRequired isInvalid={'name' in errors}>
				<FormControl.Label
					_text={{
						bold: true,
					}}
				>
					Name
				</FormControl.Label>
				<Input placeholder='John' onChangeText={(value) => setData(value)} />
				{'name' in errors ? (
					<FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
				) : (
					<FormControl.HelperText>
						Name should contain atleast 3 character.
					</FormControl.HelperText>
				)}
			</FormControl>
			<FormControl isRequired isInvalid={'age' in errors}>
				<FormControl.Label
					_text={{
						bold: true,
					}}
				>
					age
				</FormControl.Label>
				<Input placeholder='John' onChangeText={(value) => setTwo(value)} />
				{'name' in errors ? (
					<FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
				) : (
					<FormControl.HelperText>
						age should contain atleast 3 character.
					</FormControl.HelperText>
				)}
			</FormControl>
			<Button onPress={onSubmit} mt='5' colorScheme='cyan'>
				Submit
			</Button>
		</KeyboardAwareScrollView>
	)
}

export default function Val() {
	return (
		<Center flex={1}>
			<BuildingAFormExample />
		</Center>
	)
}
