import { VStack } from 'native-base'
import DangerousDelete from '~features/components/DangerousDelete'
import Gregory from '~features/components/Gregory'
import { Drawer } from 'expo-router/drawer'

export default function DebugPage() {
	return (
		<VStack alignItems='stretch' flex={1}>
			<Drawer.Screen options={{ title: 'Debug Page', headerShown: true }} />
			<DangerousDelete />
		</VStack>
	)
}
