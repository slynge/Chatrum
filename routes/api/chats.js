import express from 'express'
import { loadChats, getChatById } from '../../services/fileReaders.js'
import { createChat, addChat, editChat, deleteChat } from '../../services/CRUDChat.js'
import { uploadNewChats } from '../../services/fileWriters.js'

const chatsRouter = express.Router()

chatsRouter.get('/', async (request, response) => {
    const chats = await loadChats()
    response.send(chats)
})

chatsRouter.post('/', async (request, response) => {
    const name = request.body.name
    const account = request.session.accountLoggedIn
    const chats = await loadChats()
    const chat = createChat(name, account.id)
    addChat(chats, chat)
    await uploadNewChats(chats)
    response.status(200).send()
})

chatsRouter.get('/:id', async (request, response) => {
    const chatId = request.params.id
    const { chats, chat } = await getChatById(chatId)
    response.status(200).send(chat)
})

chatsRouter.patch('/:id', async (request, response) => {
    const chatId = request.params.id
    const newName = request.body.newName
    let chats = await loadChats()
    chats = editChat(chats, chatId, newName)
    await uploadNewChats(chats)
    response.status(200).send()
})


chatsRouter.delete('/:id', async (request, response) => {
    const chatId = request.params.id
    let chats = await loadChats()
    chats = deleteChat(chats, chatId)
    await uploadNewChats(chats)
    response.status(200).send()
})

chatsRouter.patch('/:id/messages', async (request, response) => {
    const chatId = request.params.id
    const text = request.body.text
    const accountId = request.body.accountId
    const { chats, chat } = await getChatById(chatId)
    chat.createMessage(text, accountId)
    await uploadNewChats(chats)
    response.status(200).send()
})

export { chatsRouter }