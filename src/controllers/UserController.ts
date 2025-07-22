import {BaseController} from "./BaseController";

export class UserController extends BaseController {
    async getCurrentUser() {
        let url = "account";
        return await this.api<any>(url)
    }
}