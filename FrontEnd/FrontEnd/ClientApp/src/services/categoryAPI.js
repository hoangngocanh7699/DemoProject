import RestAPI from './rest'

class CategoryAPI {
    constructor () {
        this.adapter = new RestAPI()
    }

    async getCategorys () {
        let url = 'category/getAll'
        return await this.adapter.getAsync(url, {})
    }

    async updateCategorys (payload) {
        let url = 'category/updateById' + `/${payload.id}`
        return await this.adapter.putAsync(url, payload)
    }
    async deleteCategogys (payload) {
        let url = 'category/delete' + `/${payload.id}`
        return await this.adapter.deleteAsync(url, payload)
    }
    async getByTodoId(payload) {
        let url = `category/GetByTodoId/${payload}`
        return await this.adapter.getAsync(url, {})
    }
    async createCategory(payload) {
        let url = `category/create`
        return await this.adapter.postAsync(url, payload)
    }
}

export default CategoryAPI