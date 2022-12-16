import RestAPI from './rest'

class ElementAPI {
    constructor () {
        this.adapter = new RestAPI()
    }

    async getElements () {
        let url = 'element/getAll'
        return await this.adapter.getAsync(url, {})
    }

    async updateElements (payload) {
        let url = 'element/updateById' + `/${payload.id}`
        return await this.adapter.putAsync(url, payload)
    }
    async deleteElements (payload, id) {
        let url = 'element/delete' + `/${id}`
        return await this.adapter.deleteAsync(url, payload)
    }
    async getByTodoId(payload) {
        let url = `element/GetByTodoId/${payload}`
        return await this.adapter.getAsync(url, {})
    }
    async createElement(payload) {
        let url = `element/create`
        return await this.adapter.postAsync(url, payload)
    }
    
}

export default ElementAPI