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

    const signOut = async (_: React.MouseEvent<HTMLButtonElement>) => {
        await new AuthController().signOut()
        props.setCurrentUser(undefined);
        localStorage.removeItem("token")
        navigate('/')
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
        </Box>
    );
}