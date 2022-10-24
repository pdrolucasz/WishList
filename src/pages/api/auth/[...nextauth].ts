import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb'

import { fauna } from '~/services/fauna'

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user }) {
			const { email } = user
			try {
				const user = await fauna.query<any>(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index('user_by_email'),
									q.Casefold(email!)
								)
							)
						),
						q.Create(
							q.Collection('users'),
							{ data: { email } }
						),
						q.Get(
							q.Match(
								q.Index('user_by_email'),
								q.Casefold(email!)
							)
						)
					)
				)

				await fauna.query(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index('collection_by_user_id'),
									[user.ref.id, "gostei"]
								)
							)
						),
						q.Create(
							q.Collection('collections'),
							{
								data: {
									user_id: user.ref.id,
									name: "Gostei",
									slug: "gostei"
								}
							}
						),
						true
					)
				)
				return true
			} catch (error) {
				return false
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET!
}
export default NextAuth(authOptions)
