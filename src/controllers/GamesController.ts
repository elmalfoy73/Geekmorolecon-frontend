import {BaseController} from "./BaseController";
import {Game} from "../model/Game";

export class GamesController extends BaseController {
    async getAllGames() {
        let url = "games";
        return await this.api<Game[]>(url)
    }

    async getGameByName(gameName: string) {
        let url = "games/"+gameName;
        return await this.api<Game[]>(url)
    }

    async joinGame(name: string) {
        let url = "entryToSection";
        return await this.api<any>(url, {name}, "POST")
    }
}