import {User} from "../model/user/User";
import {Box, Button, Card, Field, Heading, Input, NumberInput, SegmentGroup, Stack, Textarea} from "@chakra-ui/react";
import {PasswordInput} from "../components/ui/password-input";
import React, {useState} from "react";
import { withMask } from "use-mask-input"
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {UserController} from "../controllers/UserController";
import {CreateGameRequest} from "../model/CreateGameRequest";
import {GamesController} from "../controllers/GamesController";

export function GameCreationPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: User) => void;
}) {
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [users, setUsers] = useState([""])
    const [date, setDate] = useState("")
    const [image, setImage] = useState("")
    const [master, setMaster] = useState("")
    const [masterClub, setMasterClub] = useState("")
    const [places, setPlaces] = useState(0)
    const [counter, setCounter] = useState(places)
    const [system, setSystem] = useState("")
    const [time, setTime] = useState("")


    async function handleForm() {

        let game = new CreateGameRequest(counter, description, name, date, "", master, masterClub, places, system, time);

        let response = await new GamesController().createGame(game);
        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            console.log(response.text);
        }
    }

    return (<Box pt={4} pb={4} px={6}
                 bgImage="url('/bg.png')"
                 bgSize="cover"
                 bgRepeat="no-repeat"
                 bgAttachment="fixed"
                 position="relative">
        <Card.Root maxW="md">
            <Card.Header>
                <Card.Title>Создание партии</Card.Title>
            </Card.Header>
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
                        <SegmentGroup.Root defaultValue="Any" value={date} onValueChange={(e: any) => setDate(e.value)}>
                            <SegmentGroup.Indicator/>
                            <SegmentGroup.Items items={["22", "23"]}/>
                        </SegmentGroup.Root>
                        <Heading size="md">ноября 2025</Heading>
                    </Field.Root>
                    <Field.Root orientation="horizontal">
                        <Field.Label>Время</Field.Label>
                        <Input placeholder="15:20" ref={withMask("99:99")} value={time} onChange={(e) => setTime(e.target.value)}/>
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
                            onValueChange={(e: { value: React.SetStateAction<number>; }) => setPlaces(e.value)}
                        >
                            <NumberInput.Control />
                            <NumberInput.Input />
                        </NumberInput.Root>                    </Field.Root>
                    <Field.Root orientation="horizontal">
                        <Field.Label>Тизер</Field.Label>
                        <Textarea minH="200px" flex="1" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </Field.Root>
                </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button colorScheme="orange" mt={4} onClick={handleForm}>Создать партию</Button>
            </Card.Footer>
        </Card.Root>
    </Box>)
}