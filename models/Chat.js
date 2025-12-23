import { Message } from "./Message.js"

class Chat {
    static #globalId = 1
    constructor(id, name, dateOfCreation, accountId, messages) {
        if(id == null) {
            this.id = Chat.#globalId++
        }
        else {
            this.id = id
            if(this.id >= Chat.#globalId) {
                Chat.#globalId = this.id + 1
            }
        }
        this.name = name
        this.dateOfCreation = dateOfCreation
        this.accountId = accountId
        this.messages = messages
    }

    createMessage(text, accountId) {
        const message = new Message(null, text, new Date().toLocaleDateString('en-GB'), accountId, this.id);
        
        this.messages.push(message)
        return message
    }
}

export { Chat }