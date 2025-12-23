import { showAccountInfo } from "./account-info.js"
import { body } from "./chatroom.js"

export async function initAccountsWrapper() {
    const divWrapperAccounts = body.querySelector('.wrapper#accounts')

    // header
    const headerAccounts = document.createElement('h1')
    headerAccounts.className = 'header'
    headerAccounts.textContent = 'Accounts'
    divWrapperAccounts.appendChild(headerAccounts)

    // icon
    const iconAccounts = document.createElement('i')
    iconAccounts.className = 'bx bxs-user-account'
    divWrapperAccounts.appendChild(iconAccounts)

    await createLayoutForAccounts(divWrapperAccounts)
}

// clickable div element for every account that is inside div wrapper, encapsulated in async functions
async function getAccounts() {
    const response = await fetch('/api/accounts')
    return await response.json()    
}

async function createLayoutForAccounts(divWrapperAccounts) {
    const accounts = await getAccounts()
    const divContainer = document.createElement('div')
    divContainer.className = 'scroll-container'
    let selectedAccount = null

    for (const account of accounts) {
        // div element to hold the chat info
        const divAccount = document.createElement('div')
        divAccount.className = 'not-selected'
        divAccount.addEventListener('click', async () => {
            const isSelected = divAccount.classList.contains('selected')
            divAccount.className = isSelected ? 'not-selected' : 'selected'
            if(isSelected) {
                selectedAccount = null
            }
            else {
                if(selectedAccount) {
                    selectedAccount.click()
                }
                selectedAccount = divAccount
                await showAccountInfo(account.id)
            }
        })

        // the name of the account
        const pAccountName = document.createElement('p')
        pAccountName.textContent = account.username
        pAccountName.id = 'account-name'

        // what user level they are
        const pAccountUserLevel = document.createElement('p')
        pAccountUserLevel.textContent = `User level ${account.userLevel}`
        pAccountUserLevel.id = 'account-user-level'

        divAccount.appendChild(pAccountName)
        divAccount.appendChild(pAccountUserLevel)
        divContainer.appendChild(divAccount)
        divWrapperAccounts.appendChild(divContainer)
    }
}

