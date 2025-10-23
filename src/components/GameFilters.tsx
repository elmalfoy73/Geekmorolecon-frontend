import React from "react";
import {
    Box,
    Button,
    Menu,
    Portal,
    Stack,
    useCheckboxGroup,
} from "@chakra-ui/react";
import { Filters } from "../model/Game";

interface GameFiltersProps {
    dates: string[];
    systems: string[];
    masters: string[];
    filters: Filters;
    setFilters: (f: Filters) => void;
    fetchGamesData: () => void;
}

export function GameFilters({
                                dates,
                                systems,
                                masters,
                                filters,
                                setFilters,
                                fetchGamesData,
                            }: GameFiltersProps) {
    const groupDates = useCheckboxGroup();
    const groupSystems = useCheckboxGroup();
    const groupMasters = useCheckboxGroup();

    // Синхронизация фильтров
    React.useEffect(() => {
        filters["date"] = groupDates.value;
        fetchGamesData();
    }, [groupDates.value]);

    React.useEffect(() => {
        filters["system"] = groupSystems.value;
        fetchGamesData();
    }, [groupSystems.value]);

    React.useEffect(() => {
        filters["master"] = groupMasters.value;
        fetchGamesData();
    }, [groupMasters.value]);

    // Удобный рендер выпадающего фильтра
    const renderMenu = (
        label: string,
        items: string[],
        group: ReturnType<typeof useCheckboxGroup>
    ) => (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button>
                    {label}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.ItemGroup>
                            {items.map((value) => (
                                <Menu.CheckboxItem
                                    key={value}
                                    value={value}
                                    checked={group.isChecked(value)}
                                    onCheckedChange={() => group.toggleValue(value)}
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
    );

    const handlePlacesClick = () => {
        filters["have_places"] = !filters["have_places"];
        setFilters({ ...filters });
        fetchGamesData();
    };

    const isPlacesActive = filters["have_places"];

    return (
        <Stack
            mt={4}
            direction="row"
            align="center"
            wrap="wrap"
        >
            {/* Кнопка-фильтр "Есть места" */}
            <Button
                colorPalette={isPlacesActive ? "orange" : "gray"}
                onClick={handlePlacesClick}
            >
                Есть места
            </Button>

            {/* Остальные фильтры */}
            {renderMenu("Даты", dates, groupDates)}
            {renderMenu("Системы", systems, groupSystems)}
            {renderMenu("Мастера", masters, groupMasters)}
        </Stack>
    );
}