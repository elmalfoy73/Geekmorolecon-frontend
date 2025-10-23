import {BaseController} from "./BaseController";
import {Game, Filters} from "../model/Game";

export class GamesController extends BaseController {
    async getAllGames(filters: Filters | undefined) {
        let url = "games";
        return await this.api<Game[]>(url, {filters}, "POST")
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

    async delGame(id:string) {
        let url = "delete-section/"+id;
        return await this.api<any>(url, id,"POST")
    }

    async getGamesByChar(char: String) {
        let url = "char";
        return await this.api<any>(url, char, "POST")
    }

    async createGame(gameData: FormData) {
        return await fetch("/api/createSection", {
            method: "POST",
            body: gameData,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")!
            }
        });
    }
}
