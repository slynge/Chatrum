class Message {
    static #globalId = 1
    constructor(id, text, dateOfCreation, accountId, chatId) {
        if(id == null) {
            this.id = Message.#globalId++
        }
        else {
            this.id = id
            if(this.id >= Message.#globalId) {
                Message.#globalId = this.id + 1
            }
        }

        this.text = text
        this.dateOfCreation = dateOfCreation
        this.accountId = accountId
        this.chatId = chatId
    }
}

export { Message }