import type { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/react'
import { fauna } from "~/services/fauna";
import { convertToSlug } from '~/utils/convertToSlug';

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
		const { id } = req.query

		if (req.method === 'PUT') {
			const user = await fauna.query<User>(
				q.Get(
					q.Match(
						q.Index('user_by_email'),
						q.Casefold(session.user.email)
					)
				)
			)

			const { name } = req.body

			const data = {
				name,
				slug: convertToSlug(name)
			}

			const hasCollection = await fauna.query<any>(
				q.If(
					q.Exists(
						q.Match(
							q.Index('collection_by_user_id'),
							[user.ref.id, data.slug]
						)
					),
					q.Get(
						q.Match(
							q.Index('collection_by_user_id'),
							[user.ref.id, data.slug]
						)
					),
					false
				)
			)

			if (!hasCollection || (hasCollection && hasCollection.ref.id === id)) {
				await fauna.query(
					q.Update(
						q.Ref(q.Collection('collections'), id),
						{
							data: data
						}
					)
				)
				return res.status(200).json({ type: 'success', message: 'Coleção Atualizada com sucesso!' })
			} else {
				return res.status(400).json({ type: 'warning', message: 'Já existe uma coleção com esse nome!' })
			}
		} else if (req.method === 'DELETE') {
			await fauna.query(
				q.Delete(
					q.Ref(q.Collection('collections'), id)
				)
			)
			return res.status(200).json({ type: 'success', message: 'Coleção Apagada com sucesso!' })
		}
	} else {
		return res.status(405).json({ type: 'error', message: 'Usuário não está autenticado.' })
	}
}
