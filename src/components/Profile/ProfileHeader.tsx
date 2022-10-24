import { Avatar, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { RiUserLine } from 'react-icons/ri'

export const ProfileHeader = () => {
	const { data } = useSession()

	if (!data) return null

	return (
		<Flex
			as="header"
			w="100%"
			p="6"
			border="1px"
			borderColor="gray.500"
			rounded="lg"
		>
			<HStack spacing="4">
				{data.user && data.user.name && data.user.image ? (
					<Avatar size='2xl' name={data.user.name} src={data.user.image} />
				) : data.user && data.user.name ? (
					<Avatar size='2xl' name={data.user.name} />
				) : (
					<Avatar size='2xl' bg='red.500' icon={<Icon as={RiUserLine} />} />
				)}
				<VStack align="flex-start">
					<Text as="h1" fontSize={{ sm: 'xl', md: '3xl' }} fontWeight="bold">{data.user?.name}</Text>
					<Text as="h3">{data.user?.email}</Text>
				</VStack>
			</HStack>
		</Flex>
	)
}
