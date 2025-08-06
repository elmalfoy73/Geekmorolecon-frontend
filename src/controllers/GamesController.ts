import {BaseController} from "./BaseController";
import {Game} from "../model/Game";

export class GamesController extends BaseController {
    async getAllGames() {
        let url = "games";
        return await this.api<Game[]>(url)
    }

    async getAllActivities() {
        let url = "sections";
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

    async updateGame(game: Game) {
        let url = "update-section/"+game.id;
        return await this.api<any>(url, game,"POST")
    }

    async createGame(gameData: FormData) {
        return await fetch("http://127.0.0.1:5000/api/createSection", {
            method: "POST",
            body: gameData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")!
            }
        });
    }
}
