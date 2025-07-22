import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Card, Field, Input, Stack} from "@chakra-ui/react";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {SignInRequest} from "../model/user/auth/SignInRequest";
import {UserController} from "../controllers/UserController";


export function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let [error, setError] = useState<string | null>(null);

    async function handleForm() {

        let signInRequest = new SignInRequest(email, password);

        let response = await new AuthController().signIn(signInRequest);
        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            if(!response.exists) {
                setError("Пользователя с таким email не существует!");
            }
            if(!response.passMatch) {
                setError("Неверный пароль");
            }
            setError(null);
            let responseNew = await new UserController().getCurrentUser();
        }
    }

    return (
        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat">

            <Card.Root maxW="sm">
                <Card.Header>
                    <Card.Title>Sign In</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">                <Field.Root orientation="horizontal">
                        <Field.Label>Email</Field.Label>
                        <Input placeholder="me@example.com" flex="1" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Field.Label>Пароль</Field.Label>
                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button colorScheme="orange" onClick={handleForm}>Войти</Button>
                </Card.Footer>
            </Card.Root>
        </Box>
    )
}