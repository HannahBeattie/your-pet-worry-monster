import { Center, Divider, Heading, Image, ScrollView, Spacer, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import FullBlue from '~features/monster/FullBlue'
import PageWrapper from '~features/styledComponents/PageWrapper'
import DangerousDelete from '~features/worries/DangerousDelete'
import { worriesSelectors } from '~features/worries/worrySlice'

const fuzzle = require('../assets/fullBlue/fuzzle.png')

export default function DebugPage() {
	const smallDataText = {
		fontSize: 'sm',
	}
	const worryData = useSelector(worriesSelectors.selectAll)
	return (
		<PageWrapper>
			<ScrollView>
				<PageWrapper spacing={4}>
					<Heading fontSize={'2xl'} color={'red.600'} textAlign={'center'}>
						WARNING
					</Heading>
					<VStack>
						<Text textAlign={'center'} {...smallDataText}>
							This is mr Fuzzles secret area.
						</Text>
						<Text textAlign={'center'} {...smallDataText}>
							He will delete all the worry data from your phone
						</Text>
					</VStack>

					<VStack maxH={400} pt={8}>
						<Image h={400} source={fuzzle} alt={'fuzzle, a fuzzy-pink monster'} />
					</VStack>
					<DangerousDelete />
					<Spacer />
					<Divider />
					<Heading>Worry Data</Heading>
					<Text color={'white'} fontSize={'sm'}>
						For debugging purposes
					</Text>
					{worryData.map((worry, idx) => (
						<TouchableOpacity key={`worry-${idx}`}>
							<VStack py={4} bg='gray.900' my='2'>
								<Text color={'white'} fontSize={'sm'}>
									consumed at: {worry.consumedAt}
								</Text>
								<Text {...smallDataText}>description: {worry.description}</Text>
								<Text {...smallDataText}>extra note: {worry.extraNote}</Text>
								<Text {...smallDataText}>sensation: {worry.sensation}</Text>
								<Text {...smallDataText}>
									is active? {worry.isActive ? 'Active' : 'Inactive'}
								</Text>
							</VStack>
						</TouchableOpacity>
					))}
				</PageWrapper>
			</ScrollView>
		</PageWrapper>
	)
}
