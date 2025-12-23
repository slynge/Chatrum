import { Chat } from "../models/Chat.js"

export function createChat(name, accountId) {
    return new Chat(null, name, new Date().toLocaleDateString('en-GB'), accountId, [])
}

export function addChat(chats, chat) {
    chats.push(chat)
}

export function createMessage(chat, message, account) {
    return chat.createMessage(message, account)
}

export function editChat(chats, chatId, newName) {
    const index = chats.findIndex(chat => chat.id == chatId)
    chats[index].name = newName
    return chats
}

export function deleteChat(chats, chatId) {
    const index = chats.findIndex(chat => chat.id == chatId)
    delete chats[index]
    return chats.flat()
}