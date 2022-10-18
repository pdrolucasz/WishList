import { Flex, HStack } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Arrows } from "./Arrows"
import { CardSlider } from "./CardSlider"

interface HomeSliderProps {
	items: {
		id: number
		backdrop_path: string
		title: string
		name: string
		overview: string
		poster_path: string
	}[]
}

export const HomeSlider: FC<HomeSliderProps> = ({ items }) => {
	const widthCard = 400
	const [scrollX, setScrollX] = useState(-200)

	const handleLeftArrow = () => {
		if (typeof window !== undefined) {
			let x = scrollX + Math.round(window.innerWidth / 2)

			if (x > 0) {
				x = 0
			}
			setScrollX(x)
		}
	}

	const handleRightArrow = () => {
		if (typeof window !== undefined) {
			let x = scrollX - Math.round(window.innerWidth / 2)

			let listW = items.length * widthCard
			if ((window.innerWidth - listW) > x) {
				x = (window.innerWidth - listW) - 250
			}

			setScrollX(x)
		}
	}

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		handleRightArrow()
	// 	}, 1000)

	// 	return () => clearInterval(interval);
	// }, [])

	return (
		<>
			<Arrows
				icon={RiArrowLeftSLine}
				left
				onClick={handleLeftArrow}
			/>
			<Arrows
				icon={RiArrowRightSLine}
				right
				onClick={handleRightArrow}
			/>
			<Flex
				overflowX="hidden"
			>
				<Flex
					ml={scrollX}
					w={items.length * widthCard}
					transition="all ease 0.5s"
				>
					{items.map(item => (
						<CardSlider
							key={item.id}
							imageUrl={item.poster_path}
							title={item.title ?? item.name}
							description={item.overview}
						/>
					))}
				</Flex>
			</Flex>
		</>
	)
}
