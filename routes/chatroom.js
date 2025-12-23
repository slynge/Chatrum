import express from 'express'


const chatroomRouter = express.Router()

chatroomRouter.get('/', (request, response) => {
    const accountLoggedIn = request.session.accountLoggedIn
    if(accountLoggedIn.userLevel == 3) {
        response.render('chatroom', { name: accountLoggedIn.username, userLevel: accountLoggedIn.userLevel, isUserLevelThree: true})
    }
    else {
        response.render('chatroom', { name: accountLoggedIn.username, userLevel: accountLoggedIn.userLevel })
    }
    
})

export { chatroomRouter }
