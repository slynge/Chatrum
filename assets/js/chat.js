import { getAccountByAccountId, removeChildren } from "./account-info.js"
import { body } from "./chatroom.js"
import { account } from "./chatroom.js"

export async function initChatWrapper() {
    const divWrapperChat = body.querySelector('.wrapper#chat')

    // header
    const headerChat = document.createElement('h1')
    headerChat.className = 'header'
    headerChat.textContent = 'Choose a chat'
    headerChat.id = 'chat-info'
    divWrapperChat.appendChild(headerChat)

    // choose an account to see information - guide
    const pChatGuide = document.createElement('p')
    pChatGuide.textContent = 'Choose a chat from the list to see messages'
    pChatGuide.id = 'chat-guide'
    divWrapperChat.appendChild(pChatGuide)
}
    
export async function showChatInfo(chatId) {
    const divWrapperChat = body.querySelector('.wrapper#chat')
    removeChildren(divWrapperChat)

    const chat = await getChatById(chatId)

    // header
    const headerChat = document.createElement('h1')
    headerChat.className = 'header'
    headerChat.textContent = chat.name
    headerChat.id = 'chat-info'
    divWrapperChat.appendChild(headerChat)

    // scrollable container
    const divContainer = document.createElement('div')
    divContainer.className = 'scroll-container'

    // show messages
    for(const message of chat.messages) {
        const messageAccount = await getAccountByAccountId(message.accountId)
        const divMessage = document.createElement('div')
        const pFrom = document.createElement('p')
        pFrom.className = 'chat-message-count'
        
        if(account.id == messageAccount.id) {
            pFrom.textContent = 'You'
            divMessage.className = 'message-box-current-user'
        }
        else {
            pFrom.textContent = messageAccount.username
            divMessage.className = 'message-box-user'
        }
        const pText = document.createElement('p')
        pText.textContent = message.text
        pText.id = 'message-text'

        divMessage.append(pFrom, pText)
        divContainer.appendChild(divMessage)
    }
    const divWriteText = document.createElement('div')
    divWriteText.className = 'write-box-user'
    const inputWriteText = document.createElement('input')
    inputWriteText.type = 'text'
    inputWriteText.name = 'message'
    inputWriteText.placeholder = 'Skriv en besked...'
    inputWriteText.id = 'write-message'

    divWriteText.appendChild(inputWriteText)
    divContainer.appendChild(divWriteText)

    const divSendMessage = document.createElement('div')
    divSendMessage.id = 'send-message'
    divSendMessage.addEventListener('click', async () => sendMessage(chatId, inputWriteText.value))
    const iconSendMessage = document.createElement('i')
    iconSendMessage.className = 'bx bx-send'
    iconSendMessage.id = 'send-message-icon'
    const pSendMessage = document.createElement('p')
    pSendMessage.textContent = 'Send'
    pSendMessage.id = 'send-message-text'
    divSendMessage.append(iconSendMessage, pSendMessage)
    divContainer.appendChild(divSendMessage)
    divWrapperChat.appendChild(divContainer)

}

async function getChatById(chatId) {
    const response = await fetch(`/api/chats/${chatId}`)
    return await response.json()
}

async function sendMessage(chatId, text) {
    if(text) {
        await fetch(`/api/chats/${chatId}/messages`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text, accountId: account.id})
        })
        location.reload()

        const divChats = document.querySelectorAll('.not-selected')
        for(const divChat of divChats) {
            if(divChat.id == chatId) {
                divChat.click()
            }
        }
    }
}



