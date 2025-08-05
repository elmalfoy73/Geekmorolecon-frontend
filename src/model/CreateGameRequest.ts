export class CreateGameRequest {
    counter: number;
    date: string;
    description: string;
    image: File | null;
    master: string;
    masterClub: string;
    name: string;
    places: number;
    system: string;
    time: string;
    type: string;

    constructor(
        counter: number,
        description: string,
        name: string,
        date: string,
        image: File | null,
        master: string,
        masterClub: string,
        places: number,
        system: string,
        time: string,
        type: string
    ) {
        this.type = type;
        this.counter = counter;
        this.description = description;
        this.name = name;
        this.date = date;
        this.image = image;
        this.master = master;
        this.masterClub = masterClub;
        this.places = places;
        this.system = system;
        this.time = time;
    }
}
