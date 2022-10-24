import type { GetServerSideProps, NextPage } from 'next'

import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	VStack
} from '@chakra-ui/react'

import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'

import { getSession } from 'next-auth/react'

import { useCollections } from '~/hooks/useCollections'

import { ProfileHeader } from '~/components/Profile/ProfileHeader'
import { ModalCreateCollection } from '~/components/Profile/ModalCreateCollection'
import { ModalEditCollection } from '~/components/Profile/ModalEditCollection'
import { CardCollection } from '~/components/Profile/CardCollection'

export type Collection = {
	id: string
	name: string
	slug: string
}

interface ProfileProps {
}

const Profile: NextPage<ProfileProps> = () => {
	const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
	const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)

	const [currentCollection, setCurrentCollection] = useState<Collection | null>(null)

	const onOpenModalCreate = () => setIsOpenModalCreate(true)
	const onCloseModalCreate = () => setIsOpenModalCreate(false)

	const onOpenModalEdit = (collection: Collection) => {
		setCurrentCollection(collection)
		setIsOpenModalEdit(true)
	}
	const onCloseModalEdit = () => {
		setCurrentCollection(null)
		setIsOpenModalEdit(false)
	}

	const { data, isLoading, isFetching, error } = useCollections(1)

	return (
		<>
			<VStack
				align="center"
				justify="center"
				maxW={1120}
				position="relative"
				m="0 auto"
				py="4"
			>
				<ProfileHeader />
				<Box w="100%" flex="1" borderRadius="8" bg="gray.800" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Coleções
							{!isLoading && isFetching && (
								<Spinner
									size="sm"
									color="gray.500"
									ml="4"
								/>
							)}
						</Heading>
						<Button
							as="button"
							colorScheme="pink"
							leftIcon={<Icon as={RiAddLine} fontSize="20" />}
							onClick={onOpenModalCreate}
						>
							Criar Coleção
						</Button>
					</Flex>

					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							<Text>Falha ao obter dados dos usuários.</Text>
						</Flex>
					) : (
						<>
							<TableContainer w="100%">
								<Table colorScheme="whiteAlpha">
									<Thead>
										<Tr>
											<Th>Nome</Th>
											<Th />
										</Tr>
									</Thead>
									<Tbody>
										{data && data.collections.map(collection => (
											<CardCollection
												key={collection.id}
												collection={collection}
												onOpenModalEdit={onOpenModalEdit}
											/>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</>
					)}
				</Box>
			</VStack>
			{isOpenModalCreate && (
				<ModalCreateCollection
					isOpen={isOpenModalCreate}
					onClose={onCloseModalCreate}
				/>
			)}
			{isOpenModalEdit && currentCollection && (
				<ModalEditCollection
					isOpen={isOpenModalEdit}
					onClose={onCloseModalEdit}
					collection={currentCollection}
				/>
			)}
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req })

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,

			}
		}
	}

	return {
		props: {},
	}
}

export default Profile
