import {BaseController} from "./BaseController";
import {Game} from "../model/Game";

export class GamesController extends BaseController {
    async getAllGames() {
        let url = "games";
        return await this.api<Game[]>(url)
    }
}