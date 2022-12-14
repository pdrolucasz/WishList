import {
	Button,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { FC } from 'react'

import { AxiosError, AxiosResponse } from 'axios'

import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../Form/Input'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/services/api'
import { queryClient } from '~/services/queryClient'


type FormData = {
	name: string
}

const FormSchema = yup.object().shape({
	name: yup.string().required('Nome obrigatório'),
})

interface ModalCreateCollectionProps {
	isOpen: boolean
	onClose: () => void
}

export const ModalCreateCollection: FC<ModalCreateCollectionProps> = ({ isOpen, onClose }) => {
	const toast = useToast()

	const { register, handleSubmit, formState, reset } = useForm<FormData>({
		resolver: yupResolver(FormSchema)
	})

	const { errors } = formState

	function clearAllData() {
		onClose()
		reset()
	}

	const create = useMutation(async (values: FormData) => {
		return await api.post('/collections', {
			...values
		})
	}, {
		onSuccess: (response: AxiosResponse<any, any>) => {
			const message = response.data.message ?? 'Coleção criada com sucesso!'
			const type = response.data.type ?? 'Coleção criada com sucesso!'
			toast({
				description: message,
				status: type,
				duration: 9000,
				isClosable: true,
				position: "top-right"
			})
			clearAllData()
			queryClient.invalidateQueries(['collections'])
		},
		onError: (error: AxiosError<any, any>) => {
			const message = error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: "Não foi possível realizar cadastro."

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

	const handleCreate: SubmitHandler<FormData> = async (values) => {
		try {
			await create.mutateAsync(values)
		} catch { }
	}

	return (
		<Modal isOpen={isOpen} onClose={clearAllData}>
			<ModalOverlay />
			<ModalContent bg="gray.800">
				<ModalHeader>Criar uma coleção</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack
						as="form"
						flex="1"
						borderRadius={8}
						bg="gray.800"
						onSubmit={handleSubmit(handleCreate)}
					>
						<Input
							label="Nome"
							placeholder="Digite o nome da coleção"
							error={errors.name}
							{...register('name')}
						/>
						<HStack w="100%" justify="flex-end">
							<Button colorScheme='whiteAlpha' onClick={clearAllData}>
								Cancelar
							</Button>
							<Button
								as="button"
								type="submit"
								colorScheme="pink"
								isLoading={formState.isSubmitting}
								isDisabled={formState.isSubmitting}
							>
								Cadastrar
							</Button>
						</HStack>
					</VStack>
				</ModalBody>

			</ModalContent>
		</Modal>
	)
}
