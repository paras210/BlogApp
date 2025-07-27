import { use } from "react";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);

        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login(email, password);
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }
    async login(email, password) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}
const authService = new AuthService();

export default authService 