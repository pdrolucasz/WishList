import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
	const { data } = useSession()

	return data ? (
		<Button
			size="lg"
			rounded="full"
			colorScheme="blackAlpha"
			onClick={() => signOut()}
		>
			<HStack align="center">
				<Icon as={FaGithub} color="green" />
				<Text fontSize={['sm', 'md']}>{data.user?.name}</Text>
				<Icon as={FiX} color="gray" />
			</HStack>
		</Button >
	) : (
		<Button
			size="lg"
			rounded="full"
			colorScheme="blackAlpha"
			onClick={() => signIn('github')}
		>
			<HStack align="center">
				<Icon as={FaGithub} color="orange" />
				<Text fontSize={['sm', 'md']}>Login com github</Text>
			</HStack>
		</Button >
	)
}
