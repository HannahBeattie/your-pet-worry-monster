import { formatDistance, formatRelative } from 'date-fns'

export const useFormatDate = (date: number) => {
	// return formatRelative(date, new Date())
	return formatDistance(date, new Date(), { addSuffix: true })
}
