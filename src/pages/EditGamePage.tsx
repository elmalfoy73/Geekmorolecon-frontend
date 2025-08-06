import {User} from "../model/user/User";
import {useNavigate, useParams} from "react-router-dom";
import {GamesController} from "../controllers/GamesController";
import {ErrorResponse} from "../controllers/BaseController";
import React, {useEffect, useState} from "react";
import {Game} from "../model/Game";
import {
    Box,
    Button,
    Card, Center,
    Field,
    Input,
    NumberInput,
    Stack,
    Textarea
} from "@chakra-ui/react";

export function EditGamePage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState(false);
    const [game, setGame] = useState<Game>();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [master, setMaster] = useState("");
    const [masterClub, setMasterClub] = useState("");
    const [places, setPlaces] = useState(0);
    const [system, setSystem] = useState("");
    const [time, setTime] = useState("");

    async function fetchGameData() {
        if (!id) return;
        try {
            const response = await new GamesController().getGame(id);
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
                setGame(response);
            }
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchGameData();
    }, []);

    // После получения данных устанавливаем значения в состояния
    useEffect(() => {
        if (game) {
            setName(game.name);
            setSystem(game.system);
            setDate(game.date);
            setTime(game.time);
            setMaster(game.master);
            setMasterClub(game.masterClub);
            setPlaces(game.places);
            setDescription(game.description);
        }
    }, [game]);

    async function handleForm() {
        if (!game) return;

        const updatedGame = new Game(
            game.id,
            places - game.users.length,
            description,
            name,
            game.users,
            date,
            game.image,
            master,
            masterClub,
            places,
            system,
            time,
            game.type
        );

        const response = await new GamesController().updateGame(updatedGame);
        if (response instanceof ErrorResponse) {
            console.error(response.text);
        } else {
            console.log("Game updated successfully");
            navigate(`/game/${game.id}`)}
        }


    return (
        <Box pt={40} pb={40} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            <Center>
            {game && (
                <Card.Root minW="xl">
                    <Center>
                        <Card.Header>
                            <Card.Title mb="4" fontSize="3xl">Редактирование партии</Card.Title>
                        </Card.Header>
                    </Center>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root orientation="horizontal">
                                <Field.Label>Название</Field.Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Система</Field.Label>
                                <Input value={system} onChange={(e) => setSystem(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Дата</Field.Label>
                                <Input value={date} onChange={(e) => setDate(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Время</Field.Label>
                                <Input value={time} onChange={(e) => setTime(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Мастер</Field.Label>
                                <Input value={master} onChange={(e) => setMaster(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Клуб мастера</Field.Label>
                                <Input value={masterClub} onChange={(e) => setMasterClub(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Число игроков</Field.Label>
                                <NumberInput.Root
                                    value={places}
                                    onValueChange={(e: { value: number }) => setPlaces(e.value)}
                                >
                                    <NumberInput.Control />
                                    <NumberInput.Input />
                                </NumberInput.Root>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Тизер</Field.Label>
                                <Textarea minH="200px" flex="1" value={description}
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </Field.Root>
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button colorScheme="orange" mt={4} onClick={handleForm}>Сохранить изменения</Button>
                    </Card.Footer>
                </Card.Root>
            )}
            </Center>
        </Box>
    );
}