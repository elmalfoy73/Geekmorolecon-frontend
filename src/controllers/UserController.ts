import {BaseController} from "./BaseController";
import {User} from "../model/user/User";
import {Game} from "../model/Game";
import {UpdateRequest} from "../model/user/UpdateRequest";

export class UserController extends BaseController {
    async getCurrentUser() {
        let url = "account";
        return await this.api<{user: User}>(url);
    }

    async getUserGames() {
        let url = "user-games";
        return await this.api<Game[]>(url);
    }

    async updateUser(user: UpdateRequest) {
        let url = "update-user";
        return await this.api<string>(url, user, "POST");
    }
    async changeUserPassword(password: string) {
        let url = "update-user";
        return await this.api<any>(url, {password : password}, "POST");
    }

    async changeUserName(name: string) {
        let url = "update-user";
        return await this.api<any>(url, {name : name}, "POST");
    }
}
