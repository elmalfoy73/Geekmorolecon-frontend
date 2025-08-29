import {GamesController} from "../controllers/GamesController";
import React, {useEffect, useState} from "react";
import {ErrorResponse} from "../controllers/BaseController";
import {Badge, Box, Button, Card, For, Heading, Image, List, ListItem, Stack, CheckboxCard, Menu, Portal, useCheckboxGroup} from "@chakra-ui/react";
import {Game, Filters} from "../model/Game";
import {User} from "../model/user/User";
import {useNavigate} from "react-router-dom";
import {GameCard} from "../components/GameCard";

export function GamesPage(props: { currentUser: User | undefined; setCurrentUser: (newPersonData: User) => void; }) {
    const [error, setError] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [filters, setFilters] = useState<Filters>(new Filters());
    const [dates, setDates] = useState([]);
    const [systems, setSystems] = useState([]);
    const [masters, setMasters] = useState([]);
    const [selected, setSelected] = useState<string[]>([]);
    const groupDates = useCheckboxGroup();
    const groupSystems = useCheckboxGroup();
    const groupMasters = useCheckboxGroup();
    const chars = ["date", "system", "master"]
    let navigate = useNavigate()
    

    async function fetchGamesData() {
        try {
            const response = await new GamesController().getAllGames(filters)
            if (response instanceof ErrorResponse) {
                setError(true);
            } else  {
                setGames(response)
            }

        } catch (err) {
            setError(true);
        }
    }

    async function fetchChars() {
        try {
            chars.map(async (char) => {
                const response = await new GamesController().getGamesByChar(char)
                if (response instanceof ErrorResponse) {
                    setError(true);
                } else  {
                    if (char == "date"){
                        setDates(response);
                    } else if (char == "system"){
                        setSystems(response);
                    } else if (char == "master"){
                        setMasters(response);
                    }
                }})

        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchGamesData();
        fetchChars();
    }, []);

    useEffect(() => {
        filters["date"] = groupDates.value;
        fetchGamesData();
    }, [groupDates.value]);

    useEffect(() => {
        filters["master"] = groupMasters.value;
        fetchGamesData();
    }, [groupMasters.value]);

    useEffect(() => {
        filters["system"] = groupSystems.value;
        fetchGamesData();
    }, [groupSystems.value]);

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
        
            <CheckboxCard.Root maxW="150px" variant="surface"
                onChange={() => {
                filters["have_places"] = !filters["have_places"]
                setFilters(filters)
                fetchGamesData()}}
            >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>Eсть места</CheckboxCard.Label>
                </CheckboxCard.Content>
                <CheckboxCard.Indicator />
              </CheckboxCard.Control>
            </CheckboxCard.Root>

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="outline" size="md">
                   Даты
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      {dates.map(value => (
                        <Menu.CheckboxItem
                          key={value}
                          value={value}
                          checked={groupDates.isChecked(value)}
                          onCheckedChange={() => {
                              groupDates.toggleValue(value)
                          }}
                        >
                            {value}
                          <Menu.ItemIndicator />
                        </Menu.CheckboxItem>
                      ))}
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="outline" size="md">
                   Системы
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      {systems.map(value => (
                        <Menu.CheckboxItem
                          key={value}
                          value={value}
                          checked={groupSystems.isChecked(value)}
                          onCheckedChange={() => {
                              groupSystems.toggleValue(value)
                          }}
                        >
                            {value}
                          <Menu.ItemIndicator />
                        </Menu.CheckboxItem>
                      ))}
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="outline" size="md">
                   Мастера
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      {masters.map(value => (
                        <Menu.CheckboxItem
                          key={value}
                          value={value}
                          checked={groupMasters.isChecked(value)}
                          onCheckedChange={() => {
                              groupMasters.toggleValue(value)
                          }}
                        >
                            {value}
                          <Menu.ItemIndicator />
                        </Menu.CheckboxItem>
                      ))}
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Heading size="7xl" pb={1} color="white">
                Список партий:
            </Heading>


            {error && <div>Произошла ошибка при загрузке партий.</div>}

            {games.length > 0 ? (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={10}
                    mt={10}
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
