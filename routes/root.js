import express from 'express'

const rootRouter = express.Router()

// '/'
rootRouter.get('/', (request, response) => {
    response.redirect('/login')
})

export { rootRouter }  