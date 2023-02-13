import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	scheme: 'com.hannahbee.worry-monster',
	web: {
		bundler: 'metro',
	},
	name: 'Worry Monster',
	slug: 'worry-monster',
})
