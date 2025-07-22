import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Card, Field, Input, Stack} from "@chakra-ui/react";
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {UserController} from "../controllers/UserController";


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
            if (response == true) {
                setError("Пользователь с таким email уже существует!");
            }
            //console.log(response.userId)
        }
    }

    return (

        <Box pt={4} pb={4} px={6}
             bgImage="url('/bg.png')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed">

            <Card.Root maxW="sm">
                <Card.Header>
                    <Card.Title>Sign up</Card.Title>
                    <Card.Description>
                        Зарегистрируйтесь на сайте для записи на партии
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        <Field.Root orientation="horizontal">
                            <Field.Label>Имя</Field.Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)}/>
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Field.Label>Email</Field.Label>
                            <Input placeholder="me@example.com" flex="1" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </Field.Root> <Field.Root orientation="horizontal">
                        <Field.Label>Контакт для связи (вк/телеграмм)</Field.Label>
                        <Input value={contact} onChange={(e) => setContact(e.target.value)}/>
                    </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Field.Label>Пароль</Field.Label>
                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Field.Label>Повторите пароль</Field.Label>
                            <PasswordInput value={confirmPassword}
                                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Field.Root>
                        {passwordMismatch && <div className="errorMessage" style={{color: "red"}}>
                            Пароли не совпадают! Попробуйте снова.
                        </div>}
                        {error && <div className="errorMessage" style={{color: "red"}}>
                            {error}
                        </div>}
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button colorScheme="orange" onClick={handleForm} mt={4}>Зарегистрироваться</Button>
                </Card.Footer>
            </Card.Root>
        </Box>
)
}