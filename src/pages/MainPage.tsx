import React, {useEffect, useState} from "react";
import {Heading, Box, Image} from "@chakra-ui/react";


export function MainPage() {

    return (
        <Box mt={4} px={6} className="page">
            <div>
                <Image src='main.png'></Image>
                <Heading size="6xl">22-23 ноября | ул. Ломоносова, 9</Heading>
                <Heading size="md">GEEKMOРОЛЕКОН — это фестиваль настольно-ролевых игр, где каждый сможет получить первый ролевой опыт или опробовать новую систему. Множество мастеров из разных клубов Санкт-Петербурга готовы поделиться с вами своими историями и приключениями 🌟</Heading>
                <Heading size="md">👀 Расписание игр и запись на партии появится позже. Следите за новостями</Heading>
                <Heading size="md">Для прохода на территорию ИТМО, так же необходимо зарегестрироватья на мероприятие на сайте университета ITMO EVENTS</Heading>

            </div>
        </Box>
    );
}
