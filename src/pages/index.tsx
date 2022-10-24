import type { NextPage } from 'next'

import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '~/services/api'
import { HomeSlider } from '~/components/HomeSlider'

interface HomeProps {
}

const Home: NextPage<HomeProps> = () => {
	const [trending, setTrending] = useState([])

	useEffect(() => {
		async function getDataHome() {
			const { data } = await api.get('/home')
			setTrending(data.trending.results)
		}
		getDataHome()
	}, [])

	return (
		<Flex
			w="100%"
			align="center"
			justify="center"
			maxW={1700}
			position="relative"
			m="0 auto"
			py="4"
		>
			{trending.length > 0 && (
				<HomeSlider
					items={trending}
				/>
			)}
		</Flex>
	)
}

export default Home
