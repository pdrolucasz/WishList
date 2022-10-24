import { ReactElement, cloneElement } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

interface ActiveLinkProps extends LinkProps {
	children: ReactElement
}

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
	const { asPath } = useRouter()

	const isActive = asPath === rest.href

	return (
		<Link {...rest}>
			{cloneElement(children, {
				_after: isActive ? {
					content: '""',
					height: '3px',
					borderRadius: '3px 3px 0 0',
					width: '100%',
					position: 'absolute',
					bottom: '1px',
					left: 0,
					background: 'yellow.500'
				} : 'transparent'
			})}
		</Link>
	)
}
