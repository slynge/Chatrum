import fs from 'fs/promises'
import { pathToAccounts, pathToChats } from './paths.js'
import { Account } from '../models/Account.js'
import { Chat } from '../models/Chat.js'

export async function loadAccounts() {
    const data = await fs.readFile(pathToAccounts, 'utf-8')
    const accountsObject = JSON.parse(data)
    let accounts = accountsObject.accounts
    accounts = accounts.map(account => 
        new Account(
            account.id,
            account.username,
            account.password,
            account.dateOfCreation,
            account.userLevel
        )
    )
    return accounts
}

export async function loadChats() {
    const data = await fs.readFile(pathToChats, 'utf-8')
    const chatsObject = JSON.parse(data)
    let chats = chatsObject.chats
    chats = chats.map(chat => 
        new Chat(
            chat.id,
            chat.name,
            chat.dateOfCreation,
            chat.accountId,
            chat.messages
        )
    )
    return chats
}

export async function getMessagesByAccountId(accountId) {
    const chats = await loadChats()
    return chats.flatMap(chat => chat.messages.filter(message => message.accountId == accountId))
}

export async function getAccount(username, password) {
    const accounts = await loadAccounts()
    return accounts.find(account => account.username.toLowerCase() === username.toLowerCase().trim() && account.password === password.trim())
}

export async function getAccountById(accountId) {
    const accounts = await loadAccounts()
    return accounts.find(account => account.id == accountId)
}

export async function getChatById(chatId) {
    const chats = await loadChats()
    return {chats: chats, chat: chats.find(chat => chat.id == chatId)}
}