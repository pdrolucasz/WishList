import { Flex } from '@chakra-ui/react'
import { Logo } from './Logo'
import { SignInButton } from './SignInButton'

export function Header() {
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
				<Logo />

				<SignInButton />
			</Flex>
		</Flex>
	)
}
