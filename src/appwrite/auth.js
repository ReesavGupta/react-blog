import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account
  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name
      )
      if (userAccount) {
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (e) {
      throw e
    }
  }
  async login({ email, password }) {
    try {
      const userLoggedIn = await this.account.createEmailPasswordSession(
        email,
        password
      )
      if (userLoggedIn) {
        return userLoggedIn
      }
    } catch (e) {
      throw e
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get()
      if (user) {
        return user
      } else {
        return null
      }
    } catch (e) {
      throw e
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions()
    } catch (e) {
      console.log(e)
    }
  }
}

const authService = new AuthService()

export default authService
