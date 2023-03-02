import { Drawer } from 'expo-router/drawer'
import { Text, VStack } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import HomeButton from '~features/styledComponents/HomeButton'
import Page from '~features/styledComponents/Page'
import DangerousDelete from '~features/worries/DangerousDelete'
import ListAllWorries from '~features/worries/ListAllWorries'
import { worriesSelectors } from '~features/worries/worrySlice'

export default function DebugPage() {
	const worryData = useSelector(worriesSelectors.selectAll)
	return (
		<ScrollView>
			<Page>
				<Drawer.Screen options={{ title: 'Debug Page', headerShown: true }} />
				<DangerousDelete />
				{worryData.map((worry, idx) => (
					<TouchableOpacity key={`worry-${idx}`}>
						<VStack p='4' bg='gray.700' my='2'>
							<Text color={'red'}>{worry.consumedAt}</Text>
							<Text color={'white'}>{worry.description}</Text>
							<Text color={'gray.500'}>{worry.extraNote}</Text>
							<Text color={'gray.500'}>{worry.sensation}</Text>
							<Text color={'white'}>{worry.isActive ? 'Active' : 'Inactive'}</Text>
						</VStack>
					</TouchableOpacity>
				))}

				<HomeButton />
			</Page>
		</ScrollView>
	)
}
