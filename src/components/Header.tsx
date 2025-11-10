import React from "react";
import { NavLink } from "react-router-dom";
import { Badge, Box, Button, ButtonGroup, Image, Stack, Link } from "@chakra-ui/react";
import { User } from "../model/user/User";

export function Header(props: { currentUser: User | undefined }) {
    const isLoggedIn = props.currentUser != null;

    return (
        <header
            style={{
                position: "sticky",
                top: "0px",
                zIndex: "1",
                paddingTop: "0px",
                paddingBottom: "0px",
            }}
        >
            <Stack direction="column">
                <Box
                    display="flex"
                    bg="#FFFFFF"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    py={2}
                    px={4}
                    overflow="hidden"
                >
                    <Link href="/">
                        <Image rounded="lg" h="60px" src="roleconLogo.png" />
                    </Link>

                    {/* Контейнер для прокрутки */}
                    <Box
                        display="flex"
                        overflowX="auto"
                        maxW={{ base: "70%", md: "none" }}
                        css={{
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "-ms-overflow-style": "none", // IE и Edge
                            "scrollbar-width": "none", // Firefox
                            WebkitOverflowScrolling: "touch", // плавный скролл на iOS
                        }}
                    >
                        <ButtonGroup gap="3" flexWrap="nowrap" whiteSpace="nowrap">
                            <Button asChild>
                                <a href="/">Главная</a>
                            </Button>
                            <Button asChild>
                                <a href="/games">Партии</a>
                            </Button>
                            <Button asChild>
                                <a href="/activities">Активности</a>
                            </Button>

                            {isLoggedIn ? (
                                <Button
                                    colorPalette="orange"
                                    width="125px"
                                    asChild
                                >
                                    <a href="/account">{props.currentUser?.name}</a>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild>
                                        <a href="/signIn">Войти</a>
                                    </Button>
                                    <Button colorPalette="orange" asChild>
                                        <a href="/signUp">Зарегистрироваться</a>
                                    </Button>
                                </>
                            )}
                        </ButtonGroup>
                    </Box>
                </Box>
            </Stack>
        </header>
    );
}