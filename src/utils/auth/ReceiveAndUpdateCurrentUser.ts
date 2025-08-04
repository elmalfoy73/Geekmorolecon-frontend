import {User} from "../../model/user/User";
import {UserController} from "../../controllers/UserController";
import {ErrorResponse} from "../../controllers/BaseController";

export function receiveAndUpdateCurrentUser(
    update: (currentUser: User) => void,
    finished: () => void
) {
    let token = localStorage.getItem("token")
    if (token != "") {
        let controller = new UserController()
        controller.getCurrentUser().then((response) => {
            if (response instanceof ErrorResponse) {
                if (response.code == 401) localStorage.removeItem("token")
            } else {
                update(response.user)
            }
            finished()
        })
    } else finished()
}
