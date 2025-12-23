import express from 'express'
import { getAccount } from '../services/fileReaders.js'

const loginRouter = express.Router()

// '/login'
loginRouter.get('/', (request, response) => {
    response.render('loginOrCreateAccount', { login: true })
})

loginRouter.post('/', async (request, response) => {
    const { username, password }  = request.body 

    const account = await getAccount(username, password)
    if(account) {
        request.session.accountLoggedIn = account
        response.redirect('/chatroom')
    }
    else {
        response.render('loginOrCreateAccount', { login: true, error: 'Account not found or incorrect password!' })
    }
})

// '/login/createAccount
loginRouter.get('/createAccount', (request, response) => {
    response.render('loginOrCreateAccount', { createAccount: true })
})

export { loginRouter }  