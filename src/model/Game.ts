export class Game {
    counter: number;
    description: string;
    name: string;
    users: string[];

    constructor(counter: number, description: string, name: string, users: string[]) {
        this.counter = counter
        this.description = description
        this.name = name
        this.users = users;
    }
}