import { body } from "./chatroom.js"
import { getChats } from "./chats.js"

export async function initAccountInfoWrapper() {
    const divWrapperAccoutInfo = body.querySelector('.wrapper#account-info')

    // header
    const headerAccountInfo = document.createElement('h1')
    headerAccountInfo.className = 'header'
    headerAccountInfo.textContent = 'Choose an account'
    headerAccountInfo.id = 'account-info'
    divWrapperAccoutInfo.appendChild(headerAccountInfo)

    // choose an account to see information - guide
    const pAccountGuide = document.createElement('p')
    pAccountGuide.textContent = 'Choose an account from the list to see information'
    pAccountGuide.id = 'account-guide'
    divWrapperAccoutInfo.appendChild(pAccountGuide)
}

export async function showAccountInfo(accountId) {
    const divWrapperAccoutInfo = body.querySelector('.wrapper#account-info')
    removeChildren(divWrapperAccoutInfo)

    // header
    const headerAccountInfo = document.createElement('h1')
    headerAccountInfo.className = 'header'
    headerAccountInfo.textContent = 'Account information'
    headerAccountInfo.id = 'account-info'
    divWrapperAccoutInfo.appendChild(headerAccountInfo)

    // scrollable container
    const divContainer = document.createElement('div')
    divContainer.className = 'scroll-container'

    // lbl details of account info
    const divDetails = document.createElement('div')
    divDetails.className = 'account-details'
    const h2Details = document.createElement('h2')
    h2Details.textContent = 'Details'
    h2Details.id = 'details'
    divDetails.appendChild(h2Details)
    const lbls = ['ID', 'Name', 'Created', 'User level']
    for(const lbl of lbls) {
        const pLbl = document.createElement('p')
        pLbl.textContent = `${lbl}:`
        pLbl.className = 'lbl'
        pLbl.id = `${lbl.replaceAll(" ", "").toLocaleLowerCase()}Lbl`
        divDetails.appendChild(pLbl)
    }

    // values for details of account info
    const account = await getAccountByAccountId(accountId)
    const values = [account.id, account.username, account.dateOfCreation, account.userLevel]
    const ids = ['idValue', 'nameValue', 'createdValue', 'userlevelValue']
    for(let index = 0; index < values.length; index++) {
        const value = values.at(index)
        const id = ids.at(index)
        const pValue = document.createElement('p')
        pValue.textContent = `${value}`
        pValue.className = 'value'
        pValue.id = `${id}`
        divDetails.appendChild(pValue)
    }

    // overview of chats owned by account
    const divOwnedChats = document.createElement('div')
    divOwnedChats.className = 'account-owned-chats'
    const chatsByAccountId = await getChatsByAccountId(accountId)
    const h2Chats = document.createElement('h2')
    h2Chats.textContent = `Chats (${chatsByAccountId.length})`
    divOwnedChats.append(h2Chats)

    for(const chat of chatsByAccountId) {
        const divShowChat = document.createElement('div')
        divShowChat.className = 'show-chat'

        const pChatName = document.createElement('p')
        pChatName.textContent = chat.name
        pChatName.className = 'chat-name'
        const pMessageCount = document.createElement('p')
        pMessageCount.textContent = `${chat.messages.length} message(s)`
        pMessageCount.className = 'chat-message-count'
        divShowChat.append(pChatName, pMessageCount)

        divOwnedChats.appendChild(divShowChat)
    }

    // message statistics
    const divMessageStatistics = document.createElement('div')
    divMessageStatistics.className = 'account-message-statistics'
    const h2MessageStatistics = document.createElement('h2')
    h2MessageStatistics.textContent = 'Message statistics'
    
    const pAccountMessageCount = document.createElement('p')
    const accountMessages = await getMessagesByAccountId(accountId)
    pAccountMessageCount.textContent = accountMessages.length
    pAccountMessageCount.id = 'account-message-count'


    const pAccountMessageText = document.createElement('p')
    pAccountMessageText.textContent = 'Messages sent in total'
    pAccountMessageText.className = 'chat-message-count'
    pAccountMessageText.id = 'account-message-text'

    divMessageStatistics.append(h2MessageStatistics, pAccountMessageCount, pAccountMessageText)


    // latest messages
    const divLatestMessages = document.createElement('div')
    divLatestMessages.className = 'account-latest-messages'
    const h2LatestMessages = document.createElement('h2')
    h2LatestMessages.textContent = 'Latest messages'
    divLatestMessages.appendChild(h2LatestMessages)
    
    // id kinda works as a clock, so newer messages has bigger ids, we also only look at max 5 messages
    const accountMessagesSortedAfterTime = accountMessages.sort((message1, message2) => message2.id - message1.id).slice(0, 5)
    for(const message of accountMessagesSortedAfterTime) {
        const divMessage = document.createElement('div')
        divMessage.className = 'message-box'

        const pChatName = document.createElement('p')
        const chatName = await getChatName(message.chatId)
        pChatName.textContent = `In: ${chatName}`
        pChatName.className = 'chat-message-count'

        const pMessageText = document.createElement('p')
        pMessageText.textContent = message.text
        divMessage.append(pChatName, pMessageText)
        divLatestMessages.append(divMessage)
    }
    
    divContainer.append(divDetails, divOwnedChats, divMessageStatistics, divLatestMessages)
    divWrapperAccoutInfo.appendChild(divContainer)
}

export function removeChildren(element) {
    while(element.firstChild) {
        element.firstChild.remove()
    }
}

async function getChatsByAccountId(accountId) {
    const chats = await getChats()
    return chats.filter(chat => chat.accountId == accountId)
}

export async function getAccountByAccountId(accountId) {
    const response = await fetch(`/api/accounts/${accountId}`)
    return await response.json()
}

async function getMessagesByAccountId(accountId) {
    const response = await fetch(`/api/accounts/${accountId}/messages`)
    return await response.json()
}

async function getChatName(chatId) {
    const response = await fetch(`/api/chats/${chatId}`)
    const chat = await response.json()
    return chat.name
}


