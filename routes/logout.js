import express from 'express'

const logoutRouter = express.Router()

logoutRouter.get('/', (request, response) => {
    request.session.accountLoggedIn = undefined
    response.redirect('/login')
})

export { logoutRouter }  