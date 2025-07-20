import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Field, Input, Stack} from "@chakra-ui/react";
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";


export function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")


    let [error, setError] = useState<string | null>(null);
    let [passwordMismatch, setPasswordMismatch] = useState(false);

    async function handleForm() {

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        let signUpRequest = new SignUpRequest(email, password, name, contact);

        let response = await new AuthController().signUp(signUpRequest);
        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            if(response == true) {
                setError("Пользователь с таким email уже существует!");
            }
            setError(null);
        }
    }

    return (
        <Box mt={4} px={8} className="page">
            <Stack gap="8" maxW="sm" css={{"--field-label-width": "96px"}}>
                <Field.Root orientation="horizontal">
                    <Field.Label>Имя</Field.Label>
                    <Input value={name}  onChange={(e) => setName(e.target.value)}/>
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label>Email</Field.Label>
                    <Input placeholder="me@example.com" flex="1" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </Field.Root>                <Field.Root orientation="horizontal">
                    <Field.Label>Контакт для связи (вк/телеграмм)</Field.Label>
                    <Input value={contact} onChange={(e) => setContact(e.target.value)}/>
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label>Пароль</Field.Label>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Field.Root>
                <Field.Root orientation="horizontal">
                    <Field.Label>Повторите пароль</Field.Label>
                    <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Field.Root>
                {passwordMismatch && <div className="errorMessage" style={{color: "red"}}>
                    Пароли не совпадают! Попробуйте снова.
                </div>}
                {error && <div className="errorMessage" style={{color: "red"}}>
                    {error}
                </div>}
                <Button colorScheme="orange" onClick={handleForm}  mt={4}>Зарегистрироваться</Button>
            </Stack>
        </Box>
    )
}