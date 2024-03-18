import conf from '../conf/conf'
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite'
export class Service {
  client = new Client()
  account
  databases
  bucket
  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }
  async createPost({ title, slug, content, featuredImage, staus, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          staus,
          userId,
        }
      )
    } catch (e) {
      throw e
    }
  }
  async updatePost(slug, { title, content, featuredImage, staus }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          staus,
        }
      )
    } catch (e) {
      throw e
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
  async getAllPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (e) {
      console.log(e.messages)
      return false
    }
  }
}

const service = new Service()
export default service
