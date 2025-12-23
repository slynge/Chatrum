class Account {
    static #globalId = 1
    constructor(id, username, password, dateOfCreation, userLevel) {
        if(id == null) {
            this.id = Account.#globalId++
        }
        else {
            this.id = id
            if(this.id >= Account.#globalId) {
                Account.#globalId = this.id + 1
            }

        }
        this.username = username
        this.password = password
        this.dateOfCreation = dateOfCreation
        this.userLevel = userLevel
    }
}

export { Account }