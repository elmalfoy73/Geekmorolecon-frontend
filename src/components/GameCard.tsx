import React, {useState} from "react";
import {Badge, Card, Image, Center, Stack, Heading, Text} from "@chakra-ui/react";
import {Game} from "../model/Game";

export function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
    const isRPG = (game.type === "Партия")

    return (
        <Card.Root
            key={game.id}
            minW="0"
            overflow="hidden"
            onClick={onClick}
            cursor="pointer"
        >
            <Card.Body gap="2" >
                <Center>
                <Image src={game.image} objectFit="contain" w="70em" h="55em" />
                </Center>
                {isRPG ? (
                    <Heading mb="2" fontSize = "4xl" style = {{textAlign: "center"}}>«{game.name}»</Heading>
                ) : (
                    <Heading mb="2" style = {{ textAlign: "center"}}>{game.name}</Heading>
                )}
                <Card.Description fontSize="3xl" as="div" textAlign="center">
                    <div>{isRPG && (<b><a href={game.masterLink} target="_blank">{game.master}</a>, <a href={game.masterClubLink} target="_blank">{game.masterClub}</a></b>)}</div>
                    <div><b>Дата:</b> {game.date}</div>
                    <div><b>Время:</b> {game.time}</div>
                    <div>{game.places} мест, свободно: {game.counter}</div>
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                {game.counter == 0 ? (
                    <Stack
                    direction="row"
                    >
                    <Badge colorPalette="blue" size="lg">{game.system}</Badge>
                    <Badge colorPalette="red" size="lg">Мест нет</Badge>
                    </Stack>
                ) : (
                    <Badge colorPalette="blue" size="lg">{game.system}</Badge>
                )}
            </Card.Footer>
        </Card.Root>
    );
}
