import {User} from "../model/user/User";
import {
    Box,
    Button,
    Card,
    Center,
    Field,
    FileUpload, FileUploadList,
    Heading, Image,
    Input,
    NumberInput,
    SegmentGroup,
    Stack,
    Switch,
    Textarea
} from "@chakra-ui/react";
import {PasswordInput} from "../components/ui/password-input";
import React, {useState} from "react";
import { withMask } from "use-mask-input"
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {UserController} from "../controllers/UserController";
import {CreateGameRequest} from "../model/CreateGameRequest";
import {GamesController} from "../controllers/GamesController";
import {LuFileImage} from "react-icons/lu";

export function GameCreationPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: User) => void;
}) {
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [image, setImage] = useState<File | null>(null);
    const [master, setMaster] = useState("")
    const [masterClub, setMasterClub] = useState("")
    const [places, setPlaces] = useState(0)
    const [counter, setCounter] = useState(places)
    const [system, setSystem] = useState("")
    const [time, setTime] = useState("")
    const [isGame, setIsGame] = useState(false)
    const [preview, setPreview] = useState<string | null>(null);

    async function handleForm() {
        const formData = new FormData();
        formData.append("counter", counter.toString());
        formData.append("description", description);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("places", places.toString());
        formData.append("time", time);

        if(isGame) {
            formData.append("type", "Партия");
            formData.append("master", master);
            formData.append("masterClub", masterClub);
            formData.append("system", system);
        } else {
            formData.append("type", "");
        }

        if (image) {
            formData.append("image", image);
        }

        const response = await fetch("http://127.0.0.1:5000/api/createSection", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")!
            }
        });
        const data = await response.json();
        console.log(data);

        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            console.log(response.text);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };


    return (        <Box pt={40} pb={40} px={6}
                         bgImage="url('/bg.png')"
                         bgSize="cover"
                         bgRepeat="no-repeat"
                         bgAttachment="fixed">
        <Center>
            <Card.Root minW="xl" maxW="xl">
                <Center>
                    <Card.Header>
                        <Card.Title mb="4" fontSize="3xl">Создание мероприятия</Card.Title>
                    </Card.Header>
                </Center>
            <Card.Body>
                <Stack gap="4" w="full">
                    <FileUpload.Root  accept={["image/jpeg"]}
                                      onChange={handleFileChange}>
                        <FileUpload.HiddenInput/>
                        <FileUpload.Trigger asChild>
                            <Button variant="outline" size="sm">
                                Upload file
                            </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List/>
                    </FileUpload.Root>
                    {preview && (
                        <Image src={preview}/>
                    )}
                    <Field.Root orientation="horizontal">
                        <Field.Label>Название</Field.Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    </Field.Root>
                    <Field.Root orientation="horizontal">
                        <Field.Label>Дата</Field.Label>
                        <Input placeholder="22.10.2025" ref={withMask("99.10.2025")} value={date} onChange={(e) => setDate(e.target.value)}/>
                    </Field.Root>
                    <Field.Root orientation="horizontal">
                        <Field.Label>Время</Field.Label>
                        <Input placeholder="15:20" ref={withMask("99:99")} value={time} onChange={(e) => setTime(e.target.value)}/>
                    </Field.Root>
                    <Field.Root orientation="horizontal">
                        <Field.Label>Число участников</Field.Label>
                        <NumberInput.Root
                            value={places}
                            onValueChange={(e: { value: React.SetStateAction<number>; }) => setPlaces(e.value)}
                        >
                            <NumberInput.Control />
                            <NumberInput.Input />
                        </NumberInput.Root>
                    </Field.Root>
                    <Switch.Root checked={isGame}
                                 onCheckedChange={(e: any) => setIsGame(e.checked)}>
                        <Switch.Label>НРИ партия</Switch.Label>
                        <Switch.HiddenInput/>
                        <Switch.Control/>
                    </Switch.Root>
                    { isGame ? (
                        <Stack gap="4" w="full">
                    <Field.Root orientation="horizontal">
                        <Field.Label>Система</Field.Label>
                        <Input value={system} onChange={(e) => setSystem(e.target.value)}/>
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
                        <Field.Label>Тизер</Field.Label>
                        <Textarea minH="200px" flex="1" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </Field.Root>
                        </Stack>
                    ) : (<Field.Root orientation="horizontal">
                        <Field.Label>Описание мероприятия</Field.Label>
                        <Textarea minH="200px" flex="1" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </Field.Root>)}
                </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button colorScheme="orange" mt={4} onClick={handleForm}>Создать партию</Button>
            </Card.Footer>
        </Card.Root>
            </Center>
    </Box>)
}
