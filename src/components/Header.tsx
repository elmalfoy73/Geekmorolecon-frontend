import React from "react";
import {NavLink} from "react-router-dom";
import {Badge, Box, Button, ButtonGroup, Image, Stack, Link} from "@chakra-ui/react";
import {User} from "../model/user/User";

export function Header(props: { currentUser: User | undefined }) {

    if (props.currentUser == null) {
        return( <header style = {{
            position: 'sticky',
            top: '0px',
            zIndex: '1',
            paddingTop: '0px',
            paddingBottom: '0px'
        }}>


            <Stack direction='column'>
                <Box
                    display='flex'
                    
                    bg='#363836'
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
                        <Button asChild><a href="/activities">Активности</a></Button>
                        <Button asChild><a href="/signIn">Войти</a></Button>
                        <Button colorPalette='orange' asChild><a href="/signUp">Зарегистрироваться</a></Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </header>
    )}
        
    return (<header style = {{
            position: 'sticky',
            top: '0px',
            zIndex: '1',
            paddingTop: '0px',
            paddingBottom: '0px'
        }}>
            <Stack direction='column'>
                <Box
                    display='flex'
                    bg='#363836'
                    alignItems='center'
                    justifyContent='space-between'
                    width='100%'
                    py={6}
                    px={6}
                >
                <Link href="/">
                    <Image rounded="lg" h="60px" src="roleconLogo.png"/>
                </Link>
                    <ButtonGroup gap='4'>
                        <Button asChild><a href="/">Главная</a></Button>
                        <Button asChild><a href="/games">Партии</a></Button>
                        <Button asChild><a href="/activities">Активности</a></Button>
                        <Button colorPalette='orange' height='50px' width='125px' asChild><a href="/account">{props.currentUser?.name}</a></Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </header>
    )
}
