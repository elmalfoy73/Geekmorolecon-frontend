import React, {useState} from "react";
import {Badge, Card, Image} from "@chakra-ui/react";
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
            <Card.Body gap="2">
                <Image src={game.image} />
                {isRPG ? (
                    <Card.Title mb="2">{game.system} «{game.name}»</Card.Title>
                ) : (
                    <Card.Title mb="2">{game.name}</Card.Title>
                )}
                <Card.Description>
                    {isRPG && (<div>{game.master}, {game.masterClub}</div>)}
                    <div>Дата: {game.date}</div>
                    <div>Время: {game.time}</div>
                    <div>{game.description}</div>
                    <div>{game.places} мест, свободно: {game.counter}</div>
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                {game.counter > 0 ? (
                    <Badge colorPalette="green" size="md">Записаться</Badge>
                ) : (
                    <Badge colorPalette="red" size="md">Мест нет</Badge>
                )}
            </Card.Footer>
        </Card.Root>
    );
}