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
    IconButton, Image, Card, HStack, Badge, Popover, Portal, Center, AbsoluteCenter
} from "@chakra-ui/react";
import {User} from "../model/user/User";
import {UserController} from "../controllers/UserController";
import {ErrorResponse} from "../controllers/BaseController";
import {LuCheck, LuPencilLine, LuX} from "react-icons/lu";
import {AuthController} from "../controllers/AuthController";
import {useNavigate} from "react-router-dom";
import {UpdateRequest} from "../model/user/UpdateRequest";


export function AccountPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: User | undefined) => void;
}) {
    const [error, setError] = useState(false);
    const [newName, setNewName] = useState<string>();
    const [prevPassword, setPrevPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [newEmail, setEmail] = useState<string>();
    let [show, setShow] = useState(false)
    let handleClick = () => setShow(!show)
    let navigate = useNavigate()

    const signOut = async (_: React.MouseEvent<HTMLButtonElement>) => {
        await new AuthController().signOut()
        props.setCurrentUser(undefined);
        localStorage.removeItem("token")
        navigate('/')
    }

    async function updateUser() {
        let updateRequest = new UpdateRequest(newEmail, newPassword, newName);

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
                                        <Input placeholder={props.currentUser?.name} size="sm"
                                        onChange={(e) => setNewName(e.target.value)}/>
                                       <Button colorScheme="orange" onClick={updateUser}>Обновить</Button> 
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
                    <Button onClick={signOut} mt={4}>Выйти</Button>
                </Box>
            </Center>
        </Box>
    );
}
