class RestAPI {
    constructor () {
        this.config = {
            url: 'https://localhost:7125/api/',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': '*'
            },
            method: null,
            body: null,
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    }

    async getAsync (event, payload) {
        let url = this.config.url + event
        return await this.fetchAPI({ url: url, method: 'GET' })
    }

    async postAsync (event, payload) {
        let url = this.config.url + event
        return await this.fetchAPI({ url: url, method: 'POST', body: JSON.stringify(payload) })
    }

    async putAsync (event, payload) {
        let url = this.config.url + event
        return await this.fetchAPI({ url: url, method: 'PUT', body: JSON.stringify(payload) })
    }

    async deleteAsync (event, payload) {
        let url = this.config.url + event
        return await this.fetchAPI({ url: url, method: 'DELETE', body: JSON.stringify(payload) })
    }
    
    
    async fetchAPI (config) {
        let fetchConfig = { ...this.config, ...config }
        let result = {}
        try {
          let response = await fetch(fetchConfig.url, fetchConfig)
          try {
            result = await response.json()
          } catch (err) {
            console.log(err)
          }

          if (result.statusCode === 200) {
            return { result }
          } else {
            const msg = result.status ? result.status.msg : result.message
            const error = msg ? { ...result, message: msg, code: result.status?.code, keyParams: result.status?.keyParams } : null
            return { error, result }
          }
    
        } catch (error) {
          return { error: { message: 'Request error!!' } }
        }
    }
}

export default RestAPI
