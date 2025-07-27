import {GamesController} from "../controllers/GamesController";
import React, {useEffect, useState} from "react";
import {ErrorResponse} from "../controllers/BaseController";
import {Badge, Box, Button, Card, For, Heading, Image, List, ListItem, Stack} from "@chakra-ui/react";
import {Game} from "../model/Game";
import {User} from "../model/user/User";

export function GamesPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [error, setError] = useState(false);
    const [games, setGames] = useState<Game[]>([]);

    async function fetchGamesData() {
        try {
            const response = await new GamesController().getAllGames()
            if (response instanceof ErrorResponse) {
                setError(true);
            } else  {
                setGames(response)
            }

        } catch (err) {
            setError(true);
        }
    }

    async function joinGame(name: string) {
        try {
            const response = await new GamesController().joinGame(name)
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
            }
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchGamesData();
    }, []);

    return (
        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
                <Heading size="xl" pb={1} color="white">Список партий:</Heading>
                {error && <div>Произошла ошибка при загрузке партий.</div>}

                {games.length > 0 ? (
                    <div>
                        <Stack gap="4" direction="row">
                            {games.map((game) => (
                                    <Card.Root maxW="sm" overflow="hidden">
                                        <Card.Body gap="2">
                                            <Image h="200px" src={game.image}/>
                                            <Card.Title mb="2">{game.system} «{game.name}»</Card.Title>
                                            <Card.Description>
                                                <div>{game.master}, {game.masterClub}</div>
                                                <div>Дата: {game.date}</div>
                                                <div>Время: {game.time}</div>
                                                <div>{game.description}</div>
                                                <div>{game.counter} мест, свободно: {game.counter}</div>
                                            </Card.Description>
                                        </Card.Body>
                                        <Card.Footer justifyContent="flex-end">
                                            {game.counter > 0 ? (
                                                <Button onClick={() => joinGame(game.name)}>Join</Button>
                                                ) : (
                                                <Badge colorPalette="red" size="md">Мест нет</Badge>
                                            )}

                                        </Card.Footer>
                                    </Card.Root>
                                ))}
                        </Stack>
                    </div>
                ) : (
                    <Box mt={4}>
                        <Heading size="md" pb={1} color="white">Партий нет(</Heading>
                    </Box>
                )}
        </Box>
    );
}