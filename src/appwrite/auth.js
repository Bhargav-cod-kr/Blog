import conf from "../conf/conf.js"
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account

    constructor() {
        // Initialize Appwrite client with endpoint and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        // Initialize account service for authentication operations
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            // Create a new user account using Appwrite
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            // If account creation is successful, auto-login the user
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            // Create a session using provided credentials
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            // Fetch details of the currently authenticated user
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null
    }

    async logout() {
        try {
            // Terminate all active user sessions
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

// Export a single shared instance of AuthService for application-wide use
const authService = new AuthService()

export default authService
