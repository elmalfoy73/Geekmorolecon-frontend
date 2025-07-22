export class Game {
    counter: string;
    description: string;
    name: string;
    users: string[];

    constructor(counter: string, description: string, name: string, users: string[]) {
        this.counter = counter
        this.description = description
        this.name = name
        this.users = users;
    }
}