import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { theme } from '~/styles/theme'
import { Header } from '~/components/Header'
import { queryClient } from '~/services/queryClient'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>WishList</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					<ChakraProvider theme={theme}>
						<Header />
						<Component {...pageProps} />
					</ChakraProvider>
				</SessionProvider >
			</QueryClientProvider>
		</>
	)
}

export default MyApp
