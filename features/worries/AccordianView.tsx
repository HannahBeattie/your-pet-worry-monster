import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Spacer, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'

interface SectiionType {
	dateConsumed?: string
	worry?: string
	more?: string
	added?: string
	content?: any
}

interface Props {
	SECTIONS: SectiionType[]
}

const AccordionView = ({ SECTIONS }: Props) => {
	const [activeSection, setActiveSection] = useState<number | false>(false)

	const renderSectionTitle = (section: any) => {
		return (
			<>
				{section.dateConsumed && (
					<Text fontSize={'xl'} color={'black'}>
						{section.dateConsumed}
					</Text>
				)}
			</>
		)
	}

	const renderHeader = (section: any) => {
		return (
			<>
				{section.worry && (
					<Text fontSize={'xl'} color={'black'}>
						{section.worry}
					</Text>
				)}
				{section.more && (
					<HStack>
						<Text fontSize={'xl'} color={'black'}>
							{section.more}
						</Text>
						<Spacer />
						<MaterialIcons name='expand-more' size={30} color='black' />
					</HStack>
				)}
			</>
		)
	}

	const renderContent = (section: any) => {
		if (activeSection === section.index && !!section.content) {
			return (
				<>
					<Text fontSize={'xl'} color={'black'}>
						{section?.content}
					</Text>
					<Text fontSize={'xl'} color={'black'}>
						{section?.details}
					</Text>
					<Text fontSize={'xl'} color={'black'}>
						{section?.added}
					</Text>
				</>
			)
		} else {
			return null
		}
	}

	const updateSections = (activeSections: number[]) => {
		const section = activeSections[0]
		setActiveSection(activeSection === section ? false : section)
	}

	return (
		<VStack bg={'#d5caca'} px={8} borderRadius={'mx'}>
			<Text>HELLOOO</Text>
			<Accordion
				sections={SECTIONS.map((section, index) => ({ ...section, index }))}
				activeSections={activeSection !== false ? [activeSection] : []}
				renderSectionTitle={renderSectionTitle}
				renderHeader={renderHeader}
				renderContent={renderContent}
				onChange={updateSections}
				containerStyle={{}}
				underlayColor={'#d5caca'}
			/>
			<Text>HELLOOO</Text>
		</VStack>
	)
}

export default AccordionView
