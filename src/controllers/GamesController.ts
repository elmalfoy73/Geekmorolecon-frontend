import {BaseController} from "./BaseController";
import {Game} from "../model/Game";
import {CreateGameRequest} from "../model/CreateGameRequest";

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

    async leaveGame(id: string) {
        let url = "delete-entry/"+id;
        return await this.api<any>(url, {},"POST")
    }

    async createGame(game: CreateGameRequest) {
        let url = "createSection";
        return await this.api<any>(url, game,"POST")
    }

    async updateGame(game: Game) {
        let url = "update-section/"+game.id;
        return await this.api<any>(url, game,"POST")
    }
}
