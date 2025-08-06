import {User} from "../model/user/User";
import {useNavigate, useParams} from "react-router-dom";
import {InfoController} from "../controllers/InfoController";
import {ErrorResponse} from "../controllers/BaseController";
import {Info} from "../model/Info"
import React, {useEffect, useState} from "react";
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

export function EditInfoPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [error, setError] = useState(false);
    const [info, setInfo] = useState<any>();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("")


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
    // После получения данных устанавливаем значения в состояния
    useEffect(() => {
        if (info) {
            setAddress(info["address"])
            setDate(info["date"]);
            setDescription(info["description"]);
        }
    }, [info]);

    async function handleForm() {
        if (!info) return;

        const updatedInfo = new Info(
            description,
            date,
            address
        );

        const response = await new InfoController().updateInfo(updatedInfo);
        if (response instanceof ErrorResponse) {
            console.error(response.text);
        } else {
            console.log("Game updated successfully");
            navigate(`/`)}
        }


    return (
        <Box pt={40} pb={40} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            <Center>
            {info && (
                <Card.Root minW="xl">
                    <Center>
                        <Card.Header>
                            <Card.Title mb="4" fontSize="3xl">Редактирование информации на главной странице</Card.Title>
                        </Card.Header>
                    </Center>
                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root orientation="horizontal">
                                <Field.Label>Дата</Field.Label>
                                <Input value={date} onChange={(e) => setDate(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Адрес</Field.Label>
                                <Input value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </Field.Root>
                            <Field.Root orientation="horizontal">
                                <Field.Label>Общее описание</Field.Label>
                                <Textarea minH="200px" value={description} onChange={(e) => setDescription(e.target.value)}/>
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
