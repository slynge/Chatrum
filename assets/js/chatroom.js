import { initChatsWrapper } from "./chats.js"
import { initChatWrapper } from "./chat.js"
import { initAccountsWrapper } from "./accounts.js"
import { initAccountInfoWrapper } from "./account-info.js"


let account = null
const body = document.body

async function initAccount() {
    const response = await fetch('/api/accounts/current-account-info')
    return await response.json()
}

async function init() {
    account = await initAccount()

    await initChatsWrapper()
    await initChatWrapper()

    if(account.userLevel == 3) {
        await initAccountsWrapper()
        await initAccountInfoWrapper()
    }

}
init()

export { account, body }