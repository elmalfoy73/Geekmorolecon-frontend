import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Card, Field, Input, Stack, Center} from "@chakra-ui/react";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {SignInRequest} from "../model/user/auth/SignInRequest";
import {UserController} from "../controllers/UserController";
import {User} from "../model/user/User";
import {useNavigate} from "react-router-dom";


export function SignInPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let [error, setError] = useState<string | null>(null);
    let navigate = useNavigate()

    async function handleForm() {

        let signInRequest = new SignInRequest(email, password);

        let response = await new AuthController().signIn(signInRequest);
        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            if(!response.exists) {
                setError("Пользователя с таким email не существует!");
            } else if(!response.passMatch) {
                setError("Неверный пароль");
            } else {
                setError(null);
                localStorage.setItem("token", response.token)
                let user = await new UserController().getCurrentUser();
                if (user instanceof ErrorResponse) {
                    setError("");
                } else {
                    props.setCurrentUser(user.user);
                    console.log(props.currentUser?.name);
                    navigate("/")
                }
            }
        }
    }

    return (
        <Box pt={40} pb={40} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">
            <Center>
            <Card.Root minW="xl">
                <Center>
                <Card.Header>
                    <Card.Title mb="4" fontSize="3xl">Вход</Card.Title>
                </Card.Header>
                </Center>
                <Card.Body>
                    <Stack gap="40px">     
                        <Field.Root orientation="horizontal">
                        <Field.Label fontSize="1em">Email</Field.Label>
                        <Input placeholder="me@example.com" flex="1" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        </Field.Root>

                        <Field.Root orientation="horizontal">
                            <Field.Label fontSize="1em">Пароль</Field.Label>
                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Field.Root>
                        {error && <div className="errorMessage" style={{color: "red"}}>
                            {error}
                        </div>}
                    <Center>
                        <Button size="lg" colorScheme="orange" onClick={handleForm}>Войти</Button>
                    </Center>
                    </Stack>
                </Card.Body>
            </Card.Root>
            </Center>
        </Box>
    )
}
