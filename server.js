import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import path from 'node:path'
import { rootRouter } from './routes/root.js'
import { loginRouter } from './routes/login.js'
import { logoutRouter } from './routes/logout.js'
import { chatroomRouter } from './routes/chatroom.js'
import { accountsRouter } from './routes/api/accounts.js'
import { chatsRouter } from './routes/api/chats.js'


// constants
const server = express()

// middleware - pug, morgan, session, JSON/URL extended, express.static, routers
server.set('view engine', 'pug')
server.use(morgan('short'))
server.use(session({
    secret: 'text',
    resave: true,
    saveUninitialized: true
}))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use(express.static('assets'))

// middleware to check request path
const base = path.resolve('')
server.use((request, response, next) => {
    const requestedPath = path.resolve(path.join(base, request.path))
    if(!requestedPath.startsWith(base)) {
        return response.status(200).send('Invalid path')
    }
    next()
})

// middleware to check if logged in
server.use((request, response, next) => {
    if(request.session.accountLoggedIn && request.path.endsWith('/login')) {
        return response.redirect('/chatroom')
    }
    else if(!request.session.accountLoggedIn && request.path.endsWith('/chatroom')) {
        return response.redirect('/login')
    }
    next()
})

server.use('/', rootRouter)
server.use('/login', loginRouter)
server.use('/logout', logoutRouter)
server.use('/chatroom', chatroomRouter),
server.use('/api/chats', chatsRouter)
server.use('/api/accounts', accountsRouter)

// start server
const port = 8000
server.listen(port, (error) => {
    if(error) {
        console.log(error.message)
    }
    else {
        console.log(`Server started at localhost://${port}`)
    }
})