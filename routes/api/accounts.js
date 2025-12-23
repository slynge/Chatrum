import express from 'express'
import { loadAccounts, getAccountById, getMessagesByAccountId } from '../../services/fileReaders.js'
import { createAccount, addAccount,  } from '../../services/CRUDAccount.js'
import { uploadNewAccounts } from '../../services/fileWriters.js'

const accountsRouter = express.Router()

accountsRouter.get('/', async (request, response) => {
    const accounts = await loadAccounts()
    response.send(accounts)
})

accountsRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const accounts = await loadAccounts()
    const account = createAccount(username.trim(), password.trim())
    addAccount(accounts, account)
    await uploadNewAccounts(accounts)

    response.render('loginOrCreateAccount', { successfulAccountCreation: true })
})

accountsRouter.get('/current-account-info', async (request, response) => {
    const account = request.session.accountLoggedIn
    // fjern password
    const safeAccount = {
        id: account.id,
        userLevel: account.userLevel
        }
    response.send(safeAccount)
})

accountsRouter.get('/:id', async (request, response) => {
    const accountId = request.params.id
    
    const account = await getAccountById(accountId)
    if(account) {
        response.send(account)
    }
})

accountsRouter.get('/:id/messages', async (request, response) => {
    const accountId = request.params.id
    
    const messages = await getMessagesByAccountId(accountId)
    if(messages) {
        response.send(messages)
    }
})

export { accountsRouter }