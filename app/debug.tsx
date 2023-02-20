import { Drawer } from 'expo-router/drawer'
import Page from '~features/layout/Page'
import DangerousDelete from '~features/worries/DangerousDelete'

export default function DebugPage() {
	return (
		<Page>
			<Drawer.Screen options={{ title: 'Debug Page', headerShown: true }} />
			<DangerousDelete />
		</Page>
	)
}
