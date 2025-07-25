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
    IconButton
} from "@chakra-ui/react";
import {User} from "../model/user/User";
import {UserController} from "../controllers/UserController";
import {ErrorResponse} from "../controllers/BaseController";
import {LuCheck, LuPencilLine, LuX} from "react-icons/lu";


export function AccountPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [error, setError] = useState(false);
    const [newName, setNewName] = useState<string>();
    const [prevPassword, setPrevPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    let [show, setShow] = useState(false)
    let handleClick = () => setShow(!show)

    return (

        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            <div className="page-box">
                <Heading>{props.currentUser?.name}</Heading>
                <Heading>{props.currentUser?.email}</Heading>
            </div>
        </Box>
    );
}