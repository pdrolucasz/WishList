import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '~/services/apiFilm'

type ResponseData = {
	trending: {
		id: number
		backdrop_path: string
		title: string
		name: string
		overview: string
		poster_path: string
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { data } = await api.get(`/trending/all/day`)

	res.status(200).json({ trending: data })
}
