import {BaseController} from "./BaseController";
import {Info} from "../model/Info";

export class InfoController extends BaseController {

    async getInfo() {
        let url = "main-info";
        return await this.api<string[]>(url);
    }

    async updateInfo(info: Info) {
        let url = "update-info";
        return await this.api<any>(url, info, "POST");
    }
}
