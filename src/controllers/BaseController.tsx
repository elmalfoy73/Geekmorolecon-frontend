
const HOST = "localhost";
const PORT = "5000";


export class ErrorResponse {
    code: number
    text: string
    constructor(status: number, text: string) {
        this.code = status
        this.text = text
    }
}
export class BaseController {


    async api<T>(url: string, body: any = null, method: string = "GET", host: string | undefined = HOST, port: string | undefined = PORT): Promise<T | ErrorResponse> {
        let response = await this.request("/api/" + url, body, method)
        let text = await response.text();
        if (text == ""){
            text = "{}"
        }
        return response.ok ? JSON.parse(text) as T :
            new ErrorResponse(response.status, response.statusText)
    }

    async request(url: string, body: any, method: string) {
        let headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        const token = localStorage.getItem("token")
        if (token != null) {
            headers.append("Authorization", "Bearer " + token)
        }
        const options: RequestInit = {
            headers: headers,
            method: method,
            mode: 'cors',
            credentials: 'include'
        };
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        return await fetch(url, options);
    }

}
