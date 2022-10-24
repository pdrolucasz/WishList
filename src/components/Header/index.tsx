import { Flex, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { ActiveLink } from './ActiveLink'
import { Logo } from './Logo'
import { SignInButton } from './SignInButton'

export const Header = () => {
	const { data } = useSession()

	return (
		<Flex
			as="header"
			w="100%"
			h="20"
			mt="4"
			px="6"
			borderBottom="1px"
			borderColor="gray.500"
		>
			<Flex
				as="nav"
				w="100%"
				maxWidth={1480}
				mx="auto"
				align="center"
				justify="space-between"
			>

				<HStack>
					<Logo />
					<ActiveLink href="/">
						<ChakraLink
							position="relative"
						>
							Home
						</ChakraLink>
					</ActiveLink>
					{data && (
						<ActiveLink href="/perfil">
							<ChakraLink
								position="relative"
							>
								Perfil
							</ChakraLink>
						</ActiveLink>
					)}
				</HStack>

				<SignInButton />
			</Flex>
		</Flex>
	)
}
