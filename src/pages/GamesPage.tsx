import {GamesController} from "../controllers/GamesController";
import React, {useEffect, useState} from "react";
import {ErrorResponse} from "../controllers/BaseController";
import {Box, Button, Card, For, Heading, List, ListItem, Stack} from "@chakra-ui/react";
import {Game} from "../model/Game";

export function GamesPage() {
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

    useEffect(() => {
        fetchGamesData();
    }, []);

    return (
        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat">
            <div>
                <Heading size="lg" pb={1} color="white">Список партий:</Heading>
                {error && <div>Произошла ошибка при загрузке партий.</div>}

                {games.length > 0 ? (
                    <div>
                        <Stack gap="4" direction="row" wrap="wrap">
                            {games.map((game) => (
                                    <Card.Root width="320px"key={game.name}>
                                        <Card.Body gap="2">
                                            <Card.Title mb="2">{game.name}</Card.Title>
                                            <Card.Description>
                                                <div>Описание: {game.description}</div>
                                                <div>Мест: {game.counter}</div>
                                                <div>Записаны: {game.users}</div>
                                            </Card.Description>
                                        </Card.Body>
                                        <Card.Footer justifyContent="flex-end">
                                            <Button variant="outline">View</Button>
                                            <Button>Join</Button>
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

            </div>
        </Box>
    );
}