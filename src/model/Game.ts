export class Game {
    id: string;
    counter: number;
    date: string;
    description: string;
    image: string;
    master: string;
    masterClub: string;
    masterLink: string;
    masterClubLink: string;
    name: string;
    places: number;
    system: string;
    time: string;
    users: string[];
    type: string;

    constructor(
        id: string,
        counter: number,
        description: string,
        name: string,
        users: string[],
        date: string,
        image: string,
        master: string,
        masterClub: string,
        masterLink: string,
        masterClubLink: string,
        places: number,
        system: string,
        time: string,
        type: string
) {
        this.id = id;
        this.counter = counter;
        this.description = description;
        this.name = name;
        this.users = users;
        this.date = date;
        this.image = image;
        this.master = master;
        this.masterClub = masterClub;
        this.masterLink = masterLink;
        this.masterClubLink = masterClubLink;
        this.places = places;
        this.system = system;
        this.time = time;
        this.type = type;
    }
}

export class Filters{
    have_places: boolean | undefined;
    system: string[] | undefined;
    date: string[] | undefined;
    master: string[] | undefined;

    constructor(
        have_places?: boolean,
        system?: string[],
        date?: string[],
        master?: string[]
    ) {
        this.have_places = have_places;
        this.system = system;
        this.date = date;
        this.master = master;
    }
}
