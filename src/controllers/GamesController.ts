import {BaseController} from "./BaseController";
import {Game} from "../model/Game";

export class GamesController extends BaseController {
    async getAllGames() {
        let url = "games";
        return await this.api<Game[]>(url)
    }

    async getGame(id: string) {
        let url = "games/"+id;
        return await this.api<Game>(url)
    }

    async joinGame(id: string) {
        let url = "entryToSection";
        return await this.api<any>(url, {id}, "POST")
    }
}