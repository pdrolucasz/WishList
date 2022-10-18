import { Flex, Icon } from "@chakra-ui/react"
import { ElementType, FC } from "react"

interface ArrowsProps {
	icon: ElementType
	left?: boolean
	right?: boolean
	onClick: () => void
}

export const Arrows: FC<ArrowsProps> = ({ icon, left = false, right = false, onClick }) => {
	return (
		<Flex
			w="50px"
			h="50%"
			zIndex={99}
			align="center"
			justify="center"
			position="absolute"
			bg="blackAlpha.600"
			cursor="pointer"
			left={left ? 0 : 'inherit'}
			right={right ? 0 : 'inherit'}
			// opacity={0}
			// _hover={{
			// 	opacity: 1
			// }}
			onClick={onClick}
		>
			<Icon
				as={icon}
				fontSize="50"
			/>
		</Flex>
	)
}
