import React from "react";
import {NavLink} from "react-router-dom";
import {Badge, Box, Button, ButtonGroup, Image, Stack} from "@chakra-ui/react";
import {User} from "../model/user/User";

export function Header(props: { currentUser: User | undefined }) {
    if (props.currentUser == null) {
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
                    <Image rounded="lg" h="60px" src="roleconLogo.png"/>
                    <ButtonGroup gap='4'>
                        <Button asChild><a href="/">Главная</a></Button>
                        <Button asChild><a href="/games">Партии</a></Button>
                        <Button>Расписание</Button>
                        <Button asChild><a href="/signIn">Войти</a></Button>
                        <Button colorPalette='orange' asChild><a href="/signUp">Зарегистрироваться</a></Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </header>
    }
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
                    <Image rounded="lg" h="60px" src="roleconLogo.png"/>
                    <ButtonGroup gap='4'>
                        <Button asChild><a href="/">Главная</a></Button>
                        <Button asChild><a href="/games">Партии</a></Button>
                        <Button>Расписание</Button>
                        <Button colorPalette='orange' asChild><a href="/account">{props.currentUser?.name}</a></Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </header>
}