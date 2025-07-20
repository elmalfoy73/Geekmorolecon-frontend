export class SignUpRequest {
    email: string
    password: string
    name: string
    contact: string

    constructor(email: string, password: string, name: string, contact: string) {
        this.email = email
        this.password = password
        this.name = name
        this.contact = contact

    }
}