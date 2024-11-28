import { $fetch } from 'ofetch';
import type { IProductQuery } from './constants';

// TODO: find url dynamicaly
const v1apiUrl = "http://localhost:3000/api/v1";

export default class ServerAPI {
    token = "";
    constructor(token: string) {
        this.token = token;
    }

    // GETs
    async getServerStats(date=1) {
        const stats = await $fetch(v1apiUrl + "/stats", {
          method: 'GET',
          params: {
            jwt: this.token,
            date,
          }
        });
        return stats;
      }
    
      async getServerChats() {
        const chats = await $fetch(v1apiUrl + "/chats", {
          method: 'GET',
          params: {
            jwt: this.token
          }
        });
        return chats;
      } 
    
      async getServerInbox() {
        const inbox = await $fetch(v1apiUrl + "/inbox", {
          method: 'GET',
          params: {
            jwt: this.token
          }
        });
        return inbox;
      }
    
      async getServerUsers(id=null) {
        const chats = await $fetch(v1apiUrl + "/users", {
          method: 'GET',
          params: {
            jwt: this.token,
            id
          }
        });
        return chats;

      }
    
      async getServerBlogs(id=null) {
        const blogs = await $fetch(v1apiUrl + "/blogs", {
          method: 'GET',
          params: {
            jwt: this.token,
            id
          }
        });
        return blogs;

      }

      async getServerProducts() {
        const products = await $fetch(v1apiUrl + "/products", {
            method: 'GET',
            params: {
              jwt: this.token
            }
        });
        return products;
      }

      // Updates (я заебался, рефактор по типам сделает будущий я)
      async updateServerProduct(item: any) {
        item.flowersType = item.flowersType.code;

        const products = await $fetch(v1apiUrl + "/update/products", {
          method: "POST",
          body: {
            item,
            jwt: this.token
          }
        });
        return products;
      }

      async updateServerBlog(post: any) {
        const response = await $fetch(v1apiUrl + "/update/blogs", {
          method: "POST",
          body: {
            post,
            jwt: this.token
          }
        });
        return response;
      } 

      // Creates 
      async createServerProduct(item: IProductQuery) {
        const products = await $fetch(v1apiUrl + "/create/products", {
          method: "POST",
          body: {
            item,
            jwt: this.token
          }
        });
        return products;
      }

      async createServerBlog(post: any) {
        const response = await $fetch(v1apiUrl + "/create/blogs", {
          method: "POST",
          body: {
            post,
            jwt: this.token
          }
        });
        return response; 
      }

      // Deletes
      async deleteServerProduct(id: number) {
        const response = await $fetch(v1apiUrl + "/delete/products", {
          method: "POST",
          body: {
            id,
            jwt: this.token
          }
        });
        return response;
      }

      async deleteServerPost(id: number) {
        const response = await $fetch(v1apiUrl + "/delete/blogs", {
          method: "POST",
          body: {
            id,
            jwt: this.token
          }
        });
        return response;
      }
      async deleteServerInbox(id: number) {
        const response = await $fetch(v1apiUrl + "/delete/inbox", {
          method: "POST",
          body: {
            id,
            jwt: this.token
          }
        });
        return response;
      }
}