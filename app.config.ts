import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	scheme: 'com.hannahbee.worry-monster',
	web: {
		bundler: 'metro',
	},
	name: 'Worry Monster',
	slug: 'worry-monster',
	orientation: 'portrait',
	extra: {
		APP_ENV: process.env.APP_ENV ?? 'development',
		eas: {
			projectId: 'cb74dbd5-6441-44e2-b3e1-b9bffcdd97c3',
		},
	},
	ios: {
		bundleIdentifier: 'com.mikeylemmon.worry-monster',
		supportsTablet: true,
	},
})
