import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~/styles/theme'
import { Header } from '~/components/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>WishList</title>
			</Head>
			<SessionProvider>
				<ChakraProvider theme={theme}>
					<Header />
					<Component {...pageProps} />
				</ChakraProvider>
			</SessionProvider >
		</>
	)
}

export default MyApp
