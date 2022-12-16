import { Modal } from 'reactstrap'
import RestAPI from './rest'

class TodoAPI {
    constructor () {
        this.adapter = new RestAPI()
    }

    async getTodos () {
        let url = 'todo/getAll'
        return await this.adapter.getAsync(url, {})
    }
    async getById(payload) {
        let url = `todo/GetById/${payload}`
        return await this.adapter.getAsync(url, {})
    }
    async updateTodos (payload) {
        let url = 'todo/updateById' + `/${payload.id}`
        return await this.adapter.putAsync(url, payload)
    }
    async deleteTodos (payload, id) {
        let url = 'todo/delete' + `/${id}`
        return await this.adapter.deleteAsync(url, payload)
    }
    async createTodos (payload) {
        let url = 'todo/create' 
        return await this.adapter.postAsync(url, payload)
    }
}

export default TodoAPI