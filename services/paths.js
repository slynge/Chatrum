import path from 'node:path'

const pathToAccounts = path.join(path.resolve(''), '/routes/api/data/accounts.json')
const pathToChats = path.join(path.resolve(''), '/routes/api/data/chats.json')

export { pathToAccounts, pathToChats }