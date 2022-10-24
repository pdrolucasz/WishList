import {
	HStack,
	Icon,
	IconButton,
	Td,
	Tr,
	useToast
} from '@chakra-ui/react'
import { FC } from 'react'
import { useSession } from 'next-auth/react'

import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'

import { AxiosError, AxiosResponse } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { api } from '~/services/api'
import { queryClient } from '~/services/queryClient'

type Collection = {
	id: string
	name: string
	slug: string
}

interface CardCollectionProps {
	collection: Collection
	onOpenModalEdit: (collection: Collection) => void
}

export const CardCollection: FC<CardCollectionProps> = ({ collection, onOpenModalEdit }) => {
	const toast = useToast()
	const { data } = useSession()

	if (!data) return null

	const deleteCollection = useMutation(async () => {
		return await api.delete(`collections/${collection.id}`)
	}, {
		onSuccess: (response: AxiosResponse<any, any>) => {
			const message = response.data.message ?? 'Coleção apagada com sucesso!'
			const type = response.data.type ?? 'Coleção apagada com sucesso!'
			toast({
				description: message,
				status: type,
				duration: 9000,
				isClosable: true,
				position: "top-right"
			})
			queryClient.invalidateQueries(['collections'])
		},
		onError: (error: AxiosError<any, any>) => {
			const message = error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: "Não foi possível apagar coleção."

			const type = error.response && error.response.data && error.response.data.type
				? error.response.data.type
				: "error"

			toast({
				description: message,
				status: type,
				duration: 9000,
				isClosable: true,
				position: "top-right"
			})
		}
	})

	const handleDelete = async () => {
		try {
			await deleteCollection.mutateAsync()
		} catch { }
	}

	return (
		<Tr key={collection.id} px="6">
			<Td px={["4", "4", "6"]}>
				{collection.name}
			</Td>
			<Td>
				<HStack justify="flex-end">
					<IconButton
						aria-label='Edit database'
						colorScheme="blue"
						icon={<Icon as={RiEditLine} />}
						onClick={() => onOpenModalEdit(collection)}
					/>
					{collection.slug !== "gostei" && (
						<IconButton
							aria-label='Delete database'
							colorScheme="red"
							icon={<Icon as={RiDeleteBinLine} />}
							onClick={handleDelete}
							isLoading={deleteCollection.isLoading}
							isDisabled={deleteCollection.isLoading}
						/>
					)}
				</HStack>
			</Td>
		</Tr>
	)
}
