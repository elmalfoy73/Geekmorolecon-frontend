import {GamesController} from "../controllers/GamesController";
import React, {useEffect, useState} from "react";
import {ErrorResponse} from "../controllers/BaseController";
import {Badge, Box, Button, Card, For, Heading, Image, List, ListItem, Stack} from "@chakra-ui/react";
import {Game} from "../model/Game";
import {User} from "../model/user/User";
import {useNavigate} from "react-router-dom";
import {GameCard} from "../components/GameCard";

export function ActivitiesPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [error, setError] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    let navigate = useNavigate()

    async function fetchGamesData() {
        try {
            const response = await new GamesController().getAllActivities()
            if (response instanceof ErrorResponse) {
                setError(true);
            } else  {
                setGames(response)
            }

        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchGamesData();
    }, []);

    return (
        <Box
            pt={4}
    pb={4}
    px={6}
    bgImage="url('/bg.png')"
    bgSize="cover"
    bgRepeat="no-repeat"
    bgAttachment="fixed"
    >
    <Heading size="xl" pb={1} color="white">
        Список мероприятий:
        </Heading>
    {error && <div>Произошла ошибка при загрузке мероприятий.</div>}

        {games.length > 0 ? (
                <Box
                    display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={6}
            mt={4}
                >
                {games.map((game) => (
                        <GameCard
                            key={game.id}
                    game={game}
                    onClick={() => navigate(`/game/${game.id}`)}
            />
        ))}
            </Box>
        ) : (
            <Box mt={4}>
            <Heading size="md" pb={1} color="white">Партий нет(</Heading>
            </Box>
        )}
        </Box>
    );
    }