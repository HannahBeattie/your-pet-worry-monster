import { formatRelative } from 'date-fns'

export const useFormatDate = (date: number) => {
	return formatRelative(date, new Date())
}
