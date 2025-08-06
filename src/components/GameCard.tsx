import React, {useState} from "react";
import {Badge, Card, Image, Center, Stack} from "@chakra-ui/react";
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
                    <Center><Card.Title mb="2" fontSize = "4xl">«{game.name}»</Card.Title></Center>
                ) : (
                    <Center><Card.Title mb="2">{game.name}</Card.Title></Center>
                )}
                <Card.Description fontSize="3xl">
                    <Center>{isRPG && (<div><b>{game.master}, {game.masterClub}</b></div>)}</Center>
                    <Center><div><b>Дата:</b> {game.date}</div></Center>
                    <Center><div><b>Время:</b> {game.time}</div></Center>
                    <Center><div>{game.places} мест, свободно: {game.counter}</div></Center>
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
