import {User} from "../model/user/User";
import {useParams} from "react-router-dom";
import {GamesController} from "../controllers/GamesController";
import {ErrorResponse} from "../controllers/BaseController";
import React, {useEffect, useState} from "react";
import {Game} from "../model/Game";
import {Badge, Box, Button, Card, Heading, Image, List, Stack} from "@chakra-ui/react";

export function GamePage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState(false);
    const [game, setGame] = useState<Game>();

    async function fetchGameData() {
        if (!id) return;
        try {
            const response = await new GamesController().getGame(id)
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
                setGame(response)
            }

        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchGameData();
    }, []);

    async function joinGame(id : string) {
        try {
            const response = await new GamesController().joinGame(id)
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
            }
        } catch (err) {
            setError(true);
        }
    }

    async function leaveGame(id : string) {
            const response = await new GamesController().leaveGame(id)
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
            }
    }



    return (
        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            {game && (
                <div>
                    <Card.Root maxW="xl" overflow="hidden">
                        <Card.Body gap="2">
                            <Image h="200px" src={game.image}/>
                            <Card.Title mb="2">{game.system} «{game.name}»</Card.Title>
                            <Card.Description>
                                <div>{game.master}, {game.masterClub}</div>
                                <div>Дата: {game.date}</div>
                                <div>Время: {game.time}</div>
                                <div>{game.description}</div>
                                <div>{game.places} мест, свободно: {game.counter}</div>
                                <div>Записаны: </div>
                                <List.Root px={4}>
                                    {game.users.map((user)=>(
                                        <List.Item>
                                            {user}
                                        </List.Item>))}
                                </List.Root>
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            {game.counter > 0 ? (
                                props.currentUser?.sections?.includes(game.id) ? (
                                    <Button onClick={() => leaveGame(game.id)}>Отменить запись</Button>
                                ) : (
                                    <Button onClick={() => joinGame(game.id)}>Записаться на партию</Button>
                                )
                            ) : (
                                <Badge colorPalette="red" size="md">Мест нет</Badge>
                            )}
                        </Card.Footer>
                    </Card.Root>
                </div>
            )}
        </Box>
)
    ;
}
