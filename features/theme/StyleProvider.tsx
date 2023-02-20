import { FC, PropsWithChildren } from 'react'
import { NativeBaseProvider } from 'native-base'
import { theme } from './theme'

export type StyleProviderProps = {}

export const StyleProvider: FC<PropsWithChildren<StyleProviderProps>> = ({ children }) => {
	return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
}
