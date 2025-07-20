import React from "react";
import {NavLink} from "react-router-dom";
import {Box, Button, ButtonGroup, Stack} from "@chakra-ui/react";

export function Header() {
    return <header>
        <Stack direction='column'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                width='100%'
                py={6}
                px={6}
            >
                <ButtonGroup gap='4'>

                </ButtonGroup>
                <ButtonGroup gap='4'>
                    <Button asChild><a href="/">Главная</a></Button>
                    <Button>Партии</Button>
                    <Button>Расписание</Button>
                    <Button asChild><a href="/SignIn">Войти</a></Button>
                    <Button colorPalette='orange' asChild><a href="/SignUp">Зарегистрироваться</a></Button>
                </ButtonGroup>
            </Box>
        </Stack>
    </header>
}