import { Box, Button, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react"
import { FC, useState } from "react"
import { RiAddLine, RiHeartLine, RiMenu2Line } from "react-icons/ri"

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
					p={{ sm: 2, md: 2, lg: 4 }}
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
			{/* {mouseEnter && (
				<VStack
					w="100%"
					spacing="6"
					position="absolute"
					p={{ sm: 2, md: 2, lg: 4 }}
					top="0"
					right="0"
					align="flex-end"
				>
					<IconButton
						variant='unstyled'
						colorScheme='red'
						aria-label='favorite'
						fontSize='25'
						icon={<Icon as={RiHeartLine} fontSize="25" color="red.400" />}
					/>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label='Options'
							icon={<Icon as={RiMenu2Line} />}
							variant='unstyled'
						/>
						<MenuList>
							<MenuItem icon={<Icon as={RiAddLine} />} command='⌘T'>
								New Tab
							</MenuItem>
						</MenuList>
					</Menu>
				</VStack>
			)} */}
		</Box>
	)
}
