// import dotenv from 'dotenv'
// dotenv.config()
const baseUrl = "http://localhost:2500"
export const services = {
    createAccount: async function createAccount(nome, email, senha) {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const response = await fetch(`${baseUrl}/signup`, { method: "POST", body: JSON.stringify({ nome, email, senha }), headers })
        const responseText = await response.text()
        const status = response.status
        return { status, message: responseText }
    },
    makeLogin: async function makeLogin(email, senha) {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const response = await fetch(`${baseUrl}/signin`, { method: "POST", body: JSON.stringify({ email, senha }), headers })
        const responseText = await response.text()
        const status = response.status
        return { status, message: responseText }
    },
    makeTransaction: async function makeTransaction(value, desc, token, id, type) {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + token)
        headers.append("id", id)
        const response = await fetch(`${baseUrl}/transaction/${type}`, { method: "POST", body: JSON.stringify({ value, desc }), headers })
        
        const responseText = await response.text()
        const status = response.status
        return { status, message: responseText }
    },
    logout: async function logout(token, id) {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + token)
        headers.append("id", id)
        const response = await fetch(`${baseUrl}/logout`, { method: "POST", headers })
        
        const responseText = await response.text()
        const status = response.status
        return { status, message: responseText }
    },
    getTransactions: async function getTransactions(token, id){
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + token)
        headers.append("id", id)
        const response = await fetch(`${baseUrl}/transaction`, {method:"GET", headers})
        const responseText = await response.text()
        const status = response.status
        return { status, message: JSON.parse(responseText)}
    }

}

// const response = await services.makeTransaction("30", "cobri o pagamento da divid do salgadinho","2e2cd346-0ebd-4818-8b1a-54d1d0dbca77","644034d43946ece951a45507", "entrada")
// const response = await services.getTransactions("2e2cd346-0ebd-4818-8b1a-54d1d0dbca77","644034d43946ece951a45507")
// console.log(response)