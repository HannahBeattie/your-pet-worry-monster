import { extendTheme, theme as defaultTheme } from 'native-base'

export const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
	},

	colors: {
		primary: defaultTheme.colors.violet,
	},

	components: {
		VStack: {
			variants: {
				page: {
					_light: {
						backgroundColor: 'gray.300',
					},
					_dark: {
						backgroundColor: 'gray.900',
					},
					flex: 1,
					justifyContent: 'center',
					alignItems: 'stretch',
					padding: 8,
				},
				intro: {
					_light: {
						backgroundColor: 'gray.300',
					},
					_dark: {
						backgroundColor: 'gray.900',
					},
					flex: 1,
					justifyContent: 'center',
					alignItems: 'stretch',
					padding: 8,
					py: 100,
				},
				form: {
					_dark: {
						backgroundColor: 'gray.300',
					},
					flex: 1,

					alignItems: 'stretch',
					pt: '200',
					paddingX: 8,
					space: 10,
				},
				soft: {
					_dark: {
						backgroundColor: 'gray.300',
					},
					flex: 1,

					alignItems: 'stretch',
					pt: 100,

					paddingX: 8,
					space: 8,
				},
				abs: {
					position: 'absolute',
					left: '0',
					top: '0',
					right: '0',
					bottom: '0',
				},
				'abs-center': {
					position: 'absolute',
					left: '0',
					top: '0',
					right: '0',
					bottom: '0',
					alignItems: 'center',
					justifyContent: 'center',
				},
				center: {
					alignItems: 'center',
					justifyContent: 'center',
				},
				start: {
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
				},
				stretch: {
					alignItems: 'stretch',
					justifyContent: 'center',
				},
			},
		},

		Button: {
			baseStyle: {
				rounded: 'lg',
			},
			defaultProps: {
				px: 6,
				py: 2,
				variant: 'outline',
				backgroundColor: 'gray.900',
			},
		},

		Heading: {
			defaultProps: {
				fontSize: '2xl',
				fontWeight: '300',
			},
		},

		Text: {
			defaultProps: {
				color: 'white',
				fontSize: 'xl',
			},
			variants: {
				btn: {
					textDecorationLine: 'none',
					color: 'white',
				},
				form: {
					color: 'teal.900',
				},
			},
		},
	},
})
