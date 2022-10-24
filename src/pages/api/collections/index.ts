import type { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/react'
import { fauna } from "~/services/fauna";
import { convertToSlug } from '~/utils/convertToSlug'

type ResponseData = {
	type: 'success' | 'error' | 'warning' | 'info'
	message: string
	collections?: any
}

type User = {
	ref: {
		id: string
	}
	data: {
		stripe_customer_id: string
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const session = await getSession({ req })

	if (session && session.user && session.user.email) {
		const user = await fauna.query<User>(
			q.Get(
				q.Match(
					q.Index('user_by_email'),
					q.Casefold(session.user.email)
				)
			)
		)

		if (req.method === 'GET') {
			const response = await fauna.query<any>(
				q.Map(
					q.Paginate(q.Documents(q.Collection('collections'))/*, { size: 5 }*/),
					q.Lambda('x', q.Get(q.Var('x')))
				)
			)

			const collections = response.data.map((collection: any) => ({
				id: collection.ref.id,
				name: collection.data.name,
				slug: collection.data.slug
			}))

			return res.status(200).json({ type: 'success', message: 'Busca concluída!', collections })
		} else if (req.method === 'POST') {
			const { name } = req.body

			const data = {
				user_id: user.ref.id,
				name,
				slug: convertToSlug(name)
			}

			const hasCollection = await fauna.query(
				q.Exists(
					q.Match(
						q.Index('collection_by_user_id'),
						[user.ref.id, data.slug]
					)
				)
			)

			if (hasCollection) {
				return res.status(400).json({ type: 'warning', message: 'Já existe uma coleção com esse nome!' })
			} else {
				await fauna.query(
					q.Create(
						q.Collection('collections'),
						{ data }
					)
				)

				return res.status(200).json({ type: 'success', message: 'Coleção criada com sucesso!' })
			}
		}
	} else {
		return res.status(405).json({ type: 'error', message: 'Usuário não está autenticado.' })
	}
}
