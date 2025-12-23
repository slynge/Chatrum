import { Account } from '../models/Account.js'

export function createAccount(username, password) {
    return new Account(null, username, password, new Date().toLocaleDateString('en-GB'), 1)
}

export function addAccount(accounts, account) {
    accounts.push(account)
}