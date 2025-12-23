import fs from 'fs/promises'
import { pathToAccounts, pathToChats } from './paths.js'

export async function uploadNewAccounts(accounts) {
    const accountsWrapper = { accounts }
    await fs.writeFile(pathToAccounts, JSON.stringify(accountsWrapper, null, 2))
}

export async function uploadNewChats(chats) {
    const chatsWrapper = { chats }
    await fs.writeFile(pathToChats, JSON.stringify(chatsWrapper, null, 2))
}