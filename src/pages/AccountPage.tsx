import React, {useEffect, useState} from "react";
import {
    Heading,
    Button,
    List,
    ListItem,
    Box,
    Input,
    InputGroup,
    Editable,
    IconButton, Image, Card, HStack, Badge, Popover, Portal, Center, AbsoluteCenter, Stack
} from "@chakra-ui/react";
import {User} from "../model/user/User";
import {UserController} from "../controllers/UserController";
import {ErrorResponse} from "../controllers/BaseController";
import {LuCheck, LuPencilLine, LuX} from "react-icons/lu";
import {AuthController} from "../controllers/AuthController";
import {useNavigate} from "react-router-dom";
import {GamesController} from "../controllers/GamesController";
import {Game} from "../model/Game";


export function AccountPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: undefined) => void;
}) {
    const [error, setError] = useState(false);
    const [newName, setNewName] = useState<string>();
    const [prevPassword, setPrevPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    let [show, setShow] = useState(false)
    let handleClick = () => setShow(!show)
    let navigate = useNavigate()
    const [games, setGames] = useState<Game[]>([]);

    const signOut = async (_: React.MouseEvent<HTMLButtonElement>) => {
        await new AuthController().signOut()
        props.setCurrentUser(undefined);
        localStorage.removeItem("token")
        navigate('/')
    }

    useEffect(() => {
        fetchGamesData();
    }, []);

    async function fetchGamesData() {
        try {
            const response = await new UserController().getUserGames()
            if (response instanceof ErrorResponse) {
                setError(true);
            } else  {
                setGames(response)
            }

        } catch (err) {
            setError(true);
        }
    }

    return (
        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed"
             position="relative">
            <Center>
                <Box>
                    <Image h="200px" src="dragon.png"/>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Heading color="white">{props.currentUser?.name} ✏️</Heading>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow/>
                                    <Popover.Body>
                                        <Popover.Title fontWeight="medium">Новое имя</Popover.Title>
                                        <Input placeholder={props.currentUser?.name} size="sm"/>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>

                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Heading color="white">{props.currentUser?.email} ✏️</Heading>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow/>
                                    <Popover.Body>
                                        <Popover.Title fontWeight="medium">Новый email</Popover.Title>
                                        <Input placeholder={props.currentUser?.email} size="sm"/>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                    <Button onClick={signOut} mt={4}>Выйти</Button>
                </Box>
            </Center>
            {games.length > 0 && (
                <div>
                    <Heading size="xl" pb={1} color="white">Мои партии:</Heading>
                    <Stack gap="4" direction="row">
                        {games.map((game) => (
                            <Card.Root width="400px" overflow="hidden" onClick={() => navigate(`/game/${game.id}`)}>
                                <Card.Body gap="2">
                                    <Image h="200px" src={game.image}/>
                                    <Card.Title mb="2">{game.system} «{game.name}»</Card.Title>
                                    <Card.Description>
                                        <div>{game.master}, {game.masterClub}</div>
                                        <div>Дата: {game.date}</div>
                                        <div>Время: {game.time}</div>
                                    </Card.Description>
                                </Card.Body>
                                <Card.Footer justifyContent="flex-end">
                                </Card.Footer>
                            </Card.Root>
                        ))}
                    </Stack>
                </div> )}
        </Box>
    );
}