import RestAPI from "./rest"


class UserInput {
    constructor() {
        this.adapter = new RestAPI()
    }

    async getInput () {
        let url = 'input/getAll'
        return await this.adapter.getAsync(url, {})
    }
    async getByTodoId(payload) {
        let url = `input/GetByTodoId/${payload}`
        return await this.adapter.getAsync(url, {})
    }
    async getByElementId(payload) {
        let url = `input/GetByElementId/${payload}`
        return await this.adapter.getAsync(url, {})
    }
}

export default UserInput;