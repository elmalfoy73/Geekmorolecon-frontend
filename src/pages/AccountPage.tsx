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
    IconButton, Image, Card, HStack, Badge, Popover, Portal, Center, AbsoluteCenter, Stack, Field
} from "@chakra-ui/react";
import {User} from "../model/user/User";
import {UserController} from "../controllers/UserController";
import {ErrorResponse} from "../controllers/BaseController";
import {LuCheck, LuPencilLine, LuX} from "react-icons/lu";
import {AuthController} from "../controllers/AuthController";
import {useNavigate} from "react-router-dom";
import {UpdateRequest} from "../model/utils/UpdateRequest";
import {GamesController} from "../controllers/GamesController";
import {Game} from "../model/Game";
import {PasswordInput} from "../components/ui/password-input";
import {SignUpRequest} from "../model/user/auth/SignUpRequest";


export function AccountPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: User | undefined) => void;
}) {
    const [error, setError] = useState(false);
    const [newName, setNewName] = useState("");
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    const [games, setGames] = useState<Game[]>([]);
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    let [passwordMismatch, setPasswordMismatch] = useState(false);

    const signOut = async (_: React.MouseEvent<HTMLButtonElement>) => {
        await new AuthController().signOut()
        props.setCurrentUser(undefined);
        localStorage.removeItem("token")
        navigate('/')
    }

    async function updateUser() {
        let updateRequest = new UpdateRequest(email, password, newName);

        let response = await new UserController().updateUser(updateRequest);
        
        localStorage.removeItem("token")
        if (typeof response == "string"){
            localStorage.setItem("token", response)
        }

        let user = await new UserController().getCurrentUser();
        if (user instanceof ErrorResponse) {
            setError(true);
        } else {
            props.setCurrentUser(user.user);
        }
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

    async function handlePasswordChange() {
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        try {
            const response = await new UserController().changeUserPassword(password);
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
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
                            <Heading color="white">Ваше имя: {props.currentUser?.name} ✏️</Heading>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow/>
                                    <Popover.Body>
                                        <Popover.Title fontWeight="medium">Новое имя</Popover.Title>
                                        <Input value={newName}
                                               onChange={(e) => setNewName(e.target.value)} placeholder={props.currentUser?.name} size="sm"/>
                                        <Button onClick={updateUser} mt={1}>Изменить имя</Button>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Heading color="white">Ваш email: {props.currentUser?.email} ✏️</Heading>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow/>
                                    <Popover.Body>
                                        <Popover.Title fontWeight="medium">Новый email</Popover.Title>
                                        <Input placeholder={props.currentUser?.email} size="sm"
                                        onChange={(e) => setEmail(e.target.value)}/>
                                       <Button colorScheme="orange" onClick={updateUser}>Обновить</Button> 
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>

                    <Heading color="white">Указанный контакт: {props.currentUser?.contact}</Heading>

                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Heading color="white">Изменить пароль ✏️</Heading>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow/>
                                    <Popover.Body>
                                        <Field.Root orientation="horizontal">
                                            <Field.Label>Пароль</Field.Label>
                                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </Field.Root>
                                        <Field.Root mt={1} orientation="horizontal">
                                            <Field.Label>Повторите пароль</Field.Label>
                                            <PasswordInput value={confirmPassword}
                                                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                                        </Field.Root>
                                        <Button onClick={handlePasswordChange} mt={1}>Изменить пароль</Button>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                    <Button onClick={signOut} mt={4}>Выйти</Button>
                    {props.currentUser?.isAdmin && (
                        <Button colorPalette='orange' asChild mt={4} ml={4}><a href="/createGame">Добавить мероприятие</a></Button>
                    )}
                </Box>
            </Center>
            {games.length > 0 && (
                <div>
                    <Heading size="xl" pb={1} color="white">Мои партии:</Heading>
                    <Stack gap="4" direction="row">
                        {games.map((game) => (
                            <Card.Root width="400px" overflow="hidden" onClick={() => navigate(`/game/${game.id}`)}>
                                <Card.Body gap="2">
                                    <Image src={game.image}/>
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
