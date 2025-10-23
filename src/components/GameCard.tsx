import React, {useState} from "react";
import {Badge, Card, Image, Center, Stack, Heading, Text} from "@chakra-ui/react";
import {Game} from "../model/Game";

export function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
    const isRPG = (game.type === "Партия")

    return (
        <Card.Root
            key={game.id}
            minW="0"
            maxW="xl"
            overflow="hidden"
            onClick={onClick}
            cursor="pointer"
        >
            <Image src={game.image}/>
            <Card.Body gap="2" >
                <Center>

                </Center>
                <Heading mb="2" fontSize = "4xl" style = {{textAlign: "center"}}>«{game.name}»</Heading>
                <Card.Description fontSize="3xl" as="div" textAlign="center">
                    <div>{isRPG && (<b><a href={game.masterLink} target="_blank">{game.master}</a>, <a href={game.masterClubLink} target="_blank">{game.masterClub}</a></b>)}</div>
                    <div><b>Дата:</b> {game.date}</div>
                    <div><b>Время:</b> {game.time}</div>
                    <div>{game.places} мест, свободно: {game.counter}</div>
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Stack direction="row">
                    {isRPG && (
                        <Badge colorPalette="blue" size="lg">{game.system}</Badge>
                    )}
                    {game.counter === 0 && (
                        <Badge colorPalette="red" size="lg">Мест нет</Badge>
                    )}
                </Stack>
            </Card.Footer>
        </Card.Root>
    );
}
