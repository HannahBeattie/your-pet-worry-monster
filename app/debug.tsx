import { VStack } from 'native-base'
import DangerousDelete from '~features/worries/DangerousDelete'
import Gregory from '~features/monster/Gregory'
import { Drawer } from 'expo-router/drawer'

export default function DebugPage() {
	return (
		<VStack alignItems='stretch' flex={1}>
			<Drawer.Screen options={{ title: 'Debug Page', headerShown: true }} />
			<DangerousDelete />
		</VStack>
	)
}
