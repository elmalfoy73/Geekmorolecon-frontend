import React, {useEffect, useState} from "react";
import {PasswordInput} from "../components/ui/password-input";
import {Box, Button, Card, Center, Field, Input, Stack, Switch, Text} from "@chakra-ui/react";
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {AuthController} from "../controllers/AuthController";
import {ErrorResponse} from "../controllers/BaseController";
import {UserController} from "../controllers/UserController";
import {User} from "../model/user/User";
import {useNavigate} from "react-router-dom";
import {sha256} from "js-sha256"


export function SignUpPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [enterCode, setEnterCode] = useState("");
    const [ver, setVer] = useState(false);
    const [sogl, setSogl] = useState(false);
    const [contact, setContact] = useState("");
    let navigate = useNavigate();
    let [error, setError] = useState<string | null>(null);
    let [passwordMismatch, setPasswordMismatch] = useState(false);

    async function handleForm() {

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        let signUpRequest = new SignUpRequest(email, sha256(password), name, contact);

        let response = await new AuthController().signUp(signUpRequest);
        if (response instanceof ErrorResponse) {
            console.log(response.text);
        } else {
            if (response.exists == true) {
                setError("Пользователь с таким email уже существует!");
            } else {
                setCode(response.code)
                setVer(true)
            }
        }
    }

    async function handleVerification() {
        if (enterCode == code) {
            let verificationRequest = new SignUpRequest(email, sha256(password), name, contact);

            let response = await new AuthController().verification(verificationRequest);
            if (response instanceof ErrorResponse) {
                console.log(response.text);
            } else {
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
             bgImage="url('/bg.jpg')"
             bgSize="cover"
             bgRepeat="no-repeat"
             bgAttachment="fixed"
             minHeight="100vh">
            <Center>
                <Card.Root minW="0"
                           maxW="xl"
                           overflow="hidden"
                           cursor="pointer">
                    <Center>
                        <Card.Header>
                            {!ver &&
                                <Card.Title mb="4" fontSize="3xl">
                                    Регистрация
                                </Card.Title>
                            }
                            {ver &&
                                <Card.Title mb="4" fontSize="3xl">
                                    На ваш адрес электронной почты было выслано письмо с кодом подтверждения. Проверьте
                                    папку спам!
                                </Card.Title>}
                        </Card.Header>
                    </Center>
                    {!ver && <Card.Body>
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
                            <Switch.Root checked={sogl}
                                         onCheckedChange={(e: any) => setSogl(e.checked)}>
                                <Switch.Label>Даю согласие на обработку своих персональных данных в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ "О персональных данных"</Switch.Label>
                                <Switch.HiddenInput/>
                                <Switch.Control/>
                            </Switch.Root>
                        </Stack>
                        <div>{ver}</div>
                    </Card.Body>}
                    <Card.Footer justifyContent="flex-end">
                        {!ver &&
                            <Button colorScheme="orange" disabled={!sogl} onClick={handleForm} mt={4}>Зарегистрироваться</Button>
                        }
                        {ver && <div>
                            <Field.Root orientation="horizontal">
                                <Input value={enterCode}
                                       onChange={(e) => setEnterCode(e.target.value)}/>
                            </Field.Root>
                            <Button colorScheme="orange" onClick={handleVerification} mt={4}>Подтвердить код</Button>
                        </div>
                        }
                    </Card.Footer>
                </Card.Root>
            </Center>
        </Box>

    )
}
