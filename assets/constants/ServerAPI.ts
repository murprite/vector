import { $fetch } from 'ofetch';

export default class ServerAPI {
    token = "";
    constructor(token: string) {
        this.token = token;
    }

    async getServerStats(date=1) {
        const stats = await $fetch("/api/v1/stats", {
          method: 'GET',
          params: {
            jwt: this.token,
            date,
          }
        });
        return stats;
      }
    
      async getServerChats() {
        const chats = await $fetch("/api/v1/chats", {
          method: 'GET',
          params: {
            jwt: this.token
          }
        });
        return chats;
      } 
    
      async getServerInbox() {
        const inbox = await $fetch("/api/v1/inbox", {
          method: 'GET',
          params: {
            jwt: this.token
          }
        });
        return inbox;
      }
    
      async getServerUsers(id=null) {
        const chats = await $fetch("/api/v1/users", {
          method: 'GET',
          params: {
            jwt: this.token,
            id
          }
        });
        return chats;

      }
    
      async getServerBlogs(id=null) {
        const blogs = await $fetch("/api/v1/blogs", {
          method: 'GET',
          params: {
            jwt: this.token,
            id
          }
        });
        return blogs;

      }
}