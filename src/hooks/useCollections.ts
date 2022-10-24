import { useQuery } from "@tanstack/react-query"
import { api } from "~/services/api"

export type Collection = {
	id: string
	name: string
	slug: string
}

type GetCollectionsResponse = {
	collections: Collection[]
}

export async function getCollections(page: number): Promise<GetCollectionsResponse> {
	const { data } = await api.get('collections')

	return { collections: data.collections }
}

export function useCollections(page: number, /*options: UseQueryOptions*/) {
	return useQuery(['collections', page], () => getCollections(page), {
		staleTime: 1000 * 60 * 30 // 30 minutos
	})
}
