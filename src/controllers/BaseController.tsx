export class ErrorResponse {
    code: number
    text: string
    constructor(status: number, text: string) {
        this.code = status
        this.text = text
    }
}
export class BaseController {

    async api<T>(url: string, body: any = null, method: string = "GET"): Promise<T | ErrorResponse> {
        let response = await this.request("http://127.0.0.1:5000/api/" + url, body, method)
        let text = await response.text();
        if (text == ""){
            text = "{}"
        }
        return response.ok ? JSON.parse(text) as T :
            new ErrorResponse(response.status, response.statusText)
    }

    async request(url: string, body: any, method: string) {
        let headers: Headers = new Headers();
        const isFormData = body instanceof FormData;
        // Только для JSON добавляем Content-Type
        if (!isFormData) {
            headers.append('Content-Type', 'application/json');
        }

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
