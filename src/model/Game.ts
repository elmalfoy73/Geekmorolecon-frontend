class UserCont{
    name: string;
    contact: string;
    id: string;
    constructor(
        name: string,
        contact: string,
        id: string
    ) {
        this.name = name;
        this.contact = contact;
        this.id = id;
    }
}

export class Game {
    id: string;
    counter: number;
    date: string;
    postDate: string;
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
    postTime: string;
    endTime: string;
    room: string;
    users: UserCont[];
    type: string;

    constructor(
        id: string,
        counter: number,
        description: string,
        name: string,
        users: UserCont[],
        date: string,
        postDate: string,
        image: string,
        master: string,
        masterClub: string,
        masterLink: string,
        masterClubLink: string,
        places: number,
        system: string,
        time: string,
        postTime: string,
        type: string,
        endTime: string,
        room: string
) {
        this.id = id;
        this.counter = counter;
        this.description = description;
        this.name = name;
        this.users = users;
        this.date = date;
        this.postDate = postDate;
        this.image = image;
        this.master = master;
        this.masterClub = masterClub;
        this.masterLink = masterLink;
        this.masterClubLink = masterClubLink;
        this.places = places;
        this.system = system;
        this.time = time;
        this.postTime = postTime;
        this.endTime = endTime;
        this.room = room;
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
