import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Heading, Box, Image, Center, Button} from "@chakra-ui/react";
import {InfoController} from "../controllers/InfoController"
import {ErrorResponse} from "../controllers/BaseController";
import {User} from "../model/user/User";


export function MainPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {

    const [info, setInfo] = useState<any>();
    const [error, setError] = useState(false);
    let navigate = useNavigate()

    async function fetchInfo() {
        try {
            const response = await new InfoController().getInfo()
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
                setInfo(response)
            }

    } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <Box px={6} className="page">
        {info && (
            <div>
                <Image src='main.png'></Image>
                <Center pt={10}>
                <Heading size="2xl">{info["description"]}</Heading>
                </Center>
                <Center>
                <Heading size="6xl">{info["date"]} | {info["address"]}</Heading>
                </Center>
            </div>
        )}
        {props.currentUser?.isAdmin && (
            <Button colorPalette='orange' onClick={() => navigate(`/editInfo`)}>Редактировать информацию</Button>
        )}
        </Box>
    );
}
