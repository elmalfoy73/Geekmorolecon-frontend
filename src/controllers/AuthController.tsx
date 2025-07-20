import {SignInRequest} from "../model/user/auth/SignInRequest";
import {SignUpRequest} from "../model/user/auth/SignUpRequest";
import {BaseController} from "./BaseController";
import {SignInResponse} from "../model/user/auth/SignInResponse";

export class AuthController extends BaseController {
    async signUp(user: SignUpRequest) {
        return await this.api<boolean>("register", user, "POST")
    }

    async signIn(user: SignInRequest) {
        return await this.api<SignInResponse>("enter", user, "POST")
    }

    async signOut(){
        return await this.api<any>("logout", null, "POST")
    }
}