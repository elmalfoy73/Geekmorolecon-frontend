export class Game {
    counter: number;
    date: string;
    description: string;
    image: string;
    master: string;
    masterClub: string;
    name: string;
    places: number;
    system: number;
    time: string;
    users: string[];

    constructor(
        counter: number,
        description: string,
        name: string,
        users: string[],
        date: string,
        image: string,
        master: string,
        masterClub: string,
        places: number,
        system: number,
        time: string
    ) {
        this.counter = counter;
        this.description = description;
        this.name = name;
        this.users = users;
        this.date = date;
        this.image = image;
        this.master = master;
        this.masterClub = masterClub;
        this.places = places;
        this.system = system;
        this.time = time;
    }
}