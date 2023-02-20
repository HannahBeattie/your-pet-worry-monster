import { Heading } from 'native-base'
import React from 'react'
import Page from '~features/layout/Page'
import ConfirmMyName from '~features/monster/ConfirmMyName'
import InputName from '~features/monster/InputName'

export default function ConfirmName() {
	return (
		<Page>
			<ConfirmMyName />
		</Page>
	)
}
