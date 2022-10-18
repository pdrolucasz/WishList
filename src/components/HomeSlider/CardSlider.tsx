import { Box, Image, Text, VStack } from "@chakra-ui/react"
import { FC, useState } from "react"

interface CardSliderProps {
	imageUrl: string
	title: string
	description: string
}

export const CardSlider: FC<CardSliderProps> = ({ imageUrl, title, description }) => {
	const [mouseEnter, setMouseEnter] = useState(false)

	return (
		<Box
			w="450px"
			transform="scale(0.95)"
			transition="all ease 1s"
			_hover={{
				transform: "scale(1)"
			}}
			cursor="pointer"
			position="relative"
			zIndex={mouseEnter ? 100 : 'inherit'}
			onMouseEnter={() => setMouseEnter(true)}
			onMouseLeave={() => setMouseEnter(false)}
			overflow="hidden"
		>
			<Image
				src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/original/${imageUrl}`}
				alt={title}
				w="100%"
				objectFit="contain"
				objectPosition="center"
				fallbackSrc="fallback.jpg"
			/>
			{mouseEnter && (
				<VStack
					w="100%"
					spacing="6"
					// marginTop="-100px"
					position="absolute"
					p={{ 'sm': '2', 'md': '2', 'lg': '4' }}
					bgGradient="linear(to-b, blackAlpha.600, blackAlpha.900)"
					bottom="0"
				>
					<Text as="h2">{title}</Text>
					<Text
						noOfLines={6}
					>
						{description}
					</Text>
				</VStack>
			)}
		</Box>
	)
}
