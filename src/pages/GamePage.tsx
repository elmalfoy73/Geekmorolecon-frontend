import {User} from "../model/user/User";
import {useNavigate, useParams} from "react-router-dom";
import {GamesController} from "../controllers/GamesController";
import {ErrorResponse} from "../controllers/BaseController";
import React, {useEffect, useState} from "react";
import {Game} from "../model/Game";
import {Badge, Box, Button, Card, Center, Heading, Image, List, Stack} from "@chakra-ui/react";
import {UserController} from "../controllers/UserController";

export function GamePage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const [game, setGame] = useState<Game>();
    const [joined, setJoined] = useState(false);
    const [started, setStarted] = useState(false);
    let navigate = useNavigate();

    async function fetchGameData() {
        if (!id) return;
        try {
            const response = await new GamesController().getGame(id)
            if (response instanceof ErrorResponse) {
                setError("");
            } else {
                setGame(response);
            }

        } catch (err) {
            setError("");
        }
    }

    useEffect(() => {
        fetchGameData();
    }, []);

    useEffect(() => {
        if (!game || !props.currentUser || started) return;
        setStarted(true);
        setJoined(props.currentUser?.sections.includes(game.id) ?? false);
    }, [game, props.currentUser, started]);

    async function deleteGame() {
        if (!id) return;
        if (!game) return;
        try {
            const response = await new GamesController().delGame(game.id)
            if (response instanceof ErrorResponse) {
                setError("");
            } else {
                navigate('/games')
            }

        } catch (err) {
            setError("");
        }
    }

    async function joinGame(id : string) {
        try {
            const response = await new GamesController().joinGame(id)
            console.log(response)
            if (response instanceof ErrorResponse) {
                setError("");
            } else if(response == "Cross"){
                setError("Вы не можете записаться на эту партию, так как в таком случае в вашем расписании партий образутся пересечение!")
            } else{
                setJoined(true);
                fetchGameData();
            }
        } catch (err) {
            setError("");
            console.error("Ошибка при записи", err);
        }
    }

    async function leaveGame(id : string) {
        try {
            const response = await new GamesController().leaveGame(id)
            if (response instanceof ErrorResponse) {
                setError("");
            } else{
                setJoined(false);
                fetchGameData();
            }
        } catch (err) {
            setError("");
            console.error("Ошибка при отписке", err);
        }
    }



    return (
        <Box pt={40} pb={40} px={6}
             bgImage="url('/bg.jpg')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            <Center>
            {game && (
                <div>
                    <Card.Root maxW="xl" overflow="hidden">
                        <Image src={game.image}/>
                        <Card.Body gap="2" as="div">
                            {game.type === "Партия" ? (
                                <Card.Title mb="2">{game.system} «{game.name}»</Card.Title>
                            ) : (
                                <Card.Title mb="2">{game.name}</Card.Title>
                            )}
                            <Card.Description as="div">
                                {game.type === "Партия" &&
                                <div><a href={game.masterLink} target="_blank">{game.master}</a>, <a href={game.masterClubLink} target="_blank">{game.masterClub}</a></div> }
                                <div>Дата: {game.date}</div>
                                <div>Время: {game.time}</div>
                                <div>{game.description}</div>
                                <div>{game.places} мест, свободно: {game.counter}</div>
                                <div>Записаны: </div>
                                <List.Root px={4}>
                                    {game.users.map((user)=>(
                                        <List.Item key={user.name}>
                                            {user.name}
                                            {props.currentUser?.isMaster && ("Контакт:"+user.contact+"    ")}
                                            {props.currentUser?.isAdmin && (
                                            <Button onClick={() => new UserController().deleteFromGame(game.id, user.name)} color="red">Удалить</Button>)}
                                        </List.Item>))}
                                </List.Root>
                            </Card.Description>
                                <>
                                    {error && <span className="errorMessage" style={{color: "red"}}>
                                        {error}
                                    </span>}
                                </>
                        </Card.Body>

                        <Card.Footer justifyContent="flex-end" as="div">
                        <Stack>
                            {game.counter > 0 ? (
                                props.currentUser ? (
                                    joined ? (
                                    <Button onClick={() => leaveGame(game.id)}>Отписаться</Button>
                                ) : (
                                    <Button onClick={() =>joinGame(game.id)}>Записаться</Button>
                                )
                                ) : (
                                <Button onClick={() => navigate("/signIn")} size="md">Войдите в аккаунт для записи</Button>)
                            ) : (
                                <Badge colorPalette="red" size="md">Мест нет</Badge>
                            )}
                            {props.currentUser?.isAdmin && (
                                <div>
                                <Button colorPalette='orange' onClick={() => navigate(`/editGame/${game.id}`)}>Редактировать партию</Button>
                                <Button colorPalette='orange' onClick={() => deleteGame()}>Удалить партию</Button>
                                </div>
                            )}
                        </Stack>
                        
                        </Card.Footer>
                    </Card.Root>
                </div>
            )}
                </Center>
        </Box>
)
    ;
}


