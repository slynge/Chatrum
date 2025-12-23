import { showChatInfo } from "./chat.js"
import { body, account } from "./chatroom.js"

export async function initChatsWrapper() {
    const divWrapperChats = body.querySelector('.wrapper#chats')

    // header
    const headerChats = document.createElement('h1')
    headerChats.className = 'header'
    headerChats.textContent = 'Chats'
    divWrapperChats.appendChild(headerChats)

    // icon
    const iconChats = document.createElement('i')
    iconChats.className = 'bx bxs-chat'
    divWrapperChats.appendChild(iconChats)

    // create chat symbol (+)
    const iconCreateChat = document.createElement('i')
    iconCreateChat.className = 'bx bx-plus'
    iconCreateChat.id = 'create-chat'
    iconCreateChat.addEventListener('click', () => createChat())
    divWrapperChats.appendChild(iconCreateChat)

    await createLayoutForChats(divWrapperChats)
}

async function createChat() {
    const name = prompt('What should the name be for the new chat?')
    if(name) {
        const response = await fetch('/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            })
        })
        if(response.ok) {
            location.reload()
        }
    }
}

// clickable div element for every chat that is inside div wrapper, encapsulated in async functions
export async function getChats() {
    const response = await fetch('/api/chats')
    return await response.json()    
}

async function createLayoutForChats(divWrapperChats) {
    const chats = await getChats()
    const divContainer = document.createElement('div')
    divContainer.className = 'scroll-container'
    let selectedChat = null

    for (const chat of chats) {
        // div element to hold the chat info
        const divChat = document.createElement('div')
        divChat.className = 'not-selected'
        divChat.id = chat.id
        divChat.addEventListener('click', async () => {
            const isSelected = divChat.classList.contains('selected')
            divChat.className = isSelected ? 'not-selected' : 'selected'
            if(isSelected) {
                selectedChat = null
            }
            else {
                if(selectedChat) {
                    selectedChat.click()
                }
                selectedChat = divChat
                await showChatInfo(chat.id)
            }
        })

        // the name of the chat
        const pChatName = document.createElement('p')
        pChatName.textContent = chat.name
        pChatName.className = 'chat-name'

        // how many messages are there in the chat
        const pMessageCount = document.createElement('p')
        pMessageCount.textContent = chat.messages.length + ' message(s)'
        pMessageCount.className = 'chat-message-count'

        divChat.appendChild(pChatName)
        divChat.appendChild(pMessageCount)
        divContainer.appendChild(divChat)

        // depending on user level make edit and delete icons for the chat
        const iconEditChat = document.createElement('i')
        iconEditChat.className = 'bx bx-edit-alt'
        iconEditChat.id = 'edit-chat'
        iconEditChat.addEventListener('click', (event) => editChat(event))

        const iconDeleteChat = document.createElement('i')
        iconDeleteChat.className = 'bx bx-trash'
        iconDeleteChat.id = 'delete-chat'
        iconDeleteChat.addEventListener('click', (event) => deleteChat(event)) 
        if(account.userLevel && account.id == chat.accountId) {
            divChat.appendChild(iconEditChat)
            divChat.appendChild(iconDeleteChat)
        }
        else if(account.userLevel == 3) {
            divChat.appendChild(iconEditChat)
            divChat.appendChild(iconDeleteChat)
        }
    }

    divWrapperChats.appendChild(divContainer)
}

async function editChat(event) {
    const chatId = event.target.parentElement.id
    const newName = prompt('What should the new name of this chat be?')
    if(newName) {
        const response = await fetch(`/api/chats/${chatId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newName: newName
            })
        })
        if(response.ok) {
            location.reload()
        }
    }
}

async function deleteChat(event) {
    const chatId = event.target.parentElement.id
    const toDelete = confirm('Are you sure you want to delete this chat?')
    if(toDelete) {
        const response = await fetch(`/api/chats/${chatId}`, {
            method: 'DELETE'
        })
        if(response.ok) {
            location.reload()
        }
    }
} 

