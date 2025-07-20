import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Field, Input, Stack} from "@chakra-ui/react";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {SignInRequest} from "../model/user/auth/SignInRequest";


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
        }
    }

    return (
        <Box mt={4} px={8} className="page">
            <Stack gap="8" maxW="sm" css={{"--field-label-width": "96px"}}>
                <Field.Root orientation="horizontal">
                    <Field.Label>Email</Field.Label>
                    <Input placeholder="me@example.com" flex="1" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label>Пароль</Field.Label>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Field.Root>
                <Button colorScheme="orange" onClick={handleForm}  mt={4}>Зарегистрироваться</Button>
            </Stack>
        </Box>
    )
}