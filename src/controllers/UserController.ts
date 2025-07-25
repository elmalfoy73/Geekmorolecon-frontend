import {BaseController} from "./BaseController";
import {User} from "../model/user/User";

export class UserController extends BaseController {
    async getCurrentUser() {
        let url = "account";
        return await this.api<{user: User}>(url)
    }
}