import { GamesController } from "../controllers/GamesController";
import React, { useEffect, useState } from "react";
import { ErrorResponse } from "../controllers/BaseController";
import {
    Box,
    Button,
    Heading,
} from "@chakra-ui/react";
import { Game, Filters } from "../model/Game";
import { User } from "../model/user/User";
import { useNavigate } from "react-router-dom";
import { GameCard } from "../components/GameCard";
import { GameFilters } from "../components/GameFilters";

export function GamesPage(props: {
    currentUser: User | undefined;
    setCurrentUser: (newPersonData: User) => void;
}) {
    const [error, setError] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [filters, setFilters] = useState<Filters>(new Filters());
    const [dates, setDates] = useState<string[]>([]);
    const [systems, setSystems] = useState<string[]>([]);
    const [masters, setMasters] = useState<string[]>([]);
    const navigate = useNavigate();

    const fetchGamesData = async () => {
        try {
            const response = await new GamesController().getAllGames(filters);
            if (response instanceof ErrorResponse) {
                setError(true);
            } else {
                setGames(response);
            }
        } catch {
            setError(true);
        }
    };

    const fetchChars = async () => {
        try {
            const controller = new GamesController();
            const [d, s, m] = await Promise.all([
                controller.getGamesByChar("date"),
                controller.getGamesByChar("system"),
                controller.getGamesByChar("master"),
            ]);
            if (d instanceof ErrorResponse || s instanceof ErrorResponse || m instanceof ErrorResponse) {
                setError(true);
            } else {
                setDates(d);
                setSystems(s);
                setMasters(m);
            }
        } catch {
            setError(true);
        }
    };

    useEffect(() => {
        fetchGamesData();
        fetchChars();
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
            <Heading size="4xl" color="white">
                Список партий:
            </Heading>

            <GameFilters
                dates={dates}
                systems={systems}
                masters={masters}
                filters={filters}
                setFilters={setFilters}
                fetchGamesData={fetchGamesData}
            />

            {props.currentUser?.isAdmin && (
                <Button colorPalette="orange" asChild mt={4} ml={4}>
                    <a href="/createGame">Добавить мероприятие</a>
                </Button>
            )}

            {error && <div>Произошла ошибка при загрузке партий.</div>}

            {games.length > 0 ? (
                <Box
                    display="grid"
                    gap={6}
                    mt={6}
                    mb={6}
                    gridTemplateColumns={{
                        base: "1fr",      // на маленьких экранах — 1 карточка в ряд
                        sm: "repeat(2, 1fr)", // на средних экранах — 2 карточки
                        md: "repeat(3, 1fr)", // на больших — 3 карточки
                    }}
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
                    <Heading size="md" pb={1} color="white">
                        Партий нет(
                    </Heading>
                </Box>
            )}
        </Box>
    );
}
