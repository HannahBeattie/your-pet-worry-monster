import { useRouter } from 'expo-router'
import { ScrollView } from 'moti'
import { Heading, VStack, Text } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { useDispatch, useSelector } from 'react-redux'
import { useFormatDate } from '~features/worries/useFormatDate'
import { selectAllActive, Worry } from '~features/worries/worrySlice'

type FlatListItem = {
	time: number
	title: string
	note?: string
}

export const DraggableFlatlist = () => {
	const allActive: Worry[] = useSelector(selectAllActive).reverse()
	const dispatch = useDispatch()

	const router = useRouter()
	const font = { fontFamily: 'Poppins_300Light', color: 'black' }

	const [data, setData] = useState<FlatListItem[]>(
		allActive.map((worry) => ({
			time: worry.id,
			title: worry.description,
			note: worry.extraNote,
		}))
	)

	const renderItem = ({ item, drag, isActive }: RenderItemParams<FlatListItem>) => (
		<ScaleDecorator>
			<TouchableOpacity onLongPress={drag} disabled={isActive}>
				<VStack
					space={2}
					backgroundColor={'gray.900'}
					my={2}
					px={4}
					py={8}
					borderRadius={'md'}
				>
					<Text>{useFormatDate(item.time)}</Text>
					<Text fontSize={'sm'}>{item.title}</Text>
					{item.note && <Text>{item.note}</Text>}
				</VStack>
			</TouchableOpacity>
		</ScaleDecorator>
	)

	return (
		<SafeAreaView>
			<ScrollView>
				<VStack px={10} py={4}>
					<Heading color={'black'}>Current Worries</Heading>
					<DraggableFlatList<FlatListItem>
						data={data}
						scrollEnabled={true}
						onDragEnd={({ data }: DragEndParams<FlatListItem>) => setData(data)}
						keyExtractor={(item) => `${item.time}`}
						renderItem={renderItem}
					/>
				</VStack>
			</ScrollView>
		</SafeAreaView>
	)
}
