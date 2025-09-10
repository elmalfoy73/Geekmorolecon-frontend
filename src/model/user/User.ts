export class User {
    contact: string
    email: string
    image: string
    isAdmin: boolean
    isMaster: boolean
    name: string
    password: string
    sections: string[]

    constructor(contact: string, email: string, image: string, isAdmin: boolean, isMaster: boolean, name: string, password: string, sections: string[]) {
        this.contact = contact
        this.email = email
        this.image = image
        this.isAdmin = isAdmin
        this.isMaster = isAdmin
        this.name = name
        this.password = password
        this.sections = sections
    }
}
