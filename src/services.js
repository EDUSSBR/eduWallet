const baseUrl = process.env.REACT_APP_BACK_URL
export const services = {
    createAccount: async function createAccount(nome, email, senha) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            const response = await fetch(`${baseUrl}/signup`, { method: "POST", body: JSON.stringify({ nome, email, senha }), headers })
            const responseText = await response.text()
            const status = response.status
            return { status, message: responseText }
        } catch (e) {
            return e
        }
    },
    makeLogin: async function makeLogin(email, senha) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            const response = await fetch(`${baseUrl}/signin`, { method: "POST", body: JSON.stringify({ email, senha }), headers })
            const responseText = await response.text()
            const status = response.status
            return { status, message: responseText }
        } catch (e) {
            return e
        }

    },
    makeTransaction: async function makeTransaction(value, desc, token, id, type) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", "Bearer " + token)
            headers.append("id", id)
            const response = await fetch(`${baseUrl}/transaction/${type}`, { method: "POST", body: JSON.stringify({ value, desc }), headers })

            const responseText = await response.text()
            const status = response.status
            return { status, message: responseText }
        } catch (e) {
            return e
        }
    },
    updateTransaction: async function updateTransaction(value, desc, token, id, type, transactionID) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", "Bearer " + token)
            headers.append("id", id)
            console.log(type, transactionID)
            const response = await fetch(`${baseUrl}/transaction/${type}`, { method: "PUT", body: JSON.stringify({ value, desc, transactionID }), headers })

            const responseText = await response.text()
            const status = response.status
            return { status, message: responseText }
        } catch (e) {
            return e
        }
    },
    logout: async function logout(token, id) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", "Bearer " + token)
            headers.append("id", id)
            const response = await fetch(`${baseUrl}/logout`, { method: "POST", headers })

            const responseText = await response.text()
            const status = response.status

            return { status, message: responseText }
        } catch (e) {
            return e
        }
    },
    getTransactions: async function getTransactions(token, id) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", "Bearer " + token)
            headers.append("id", id)
            const response = await fetch(`${baseUrl}/transaction`, { method: "GET", headers})
            const responseText = await response.text()
            const status = response.status
            return { status, message: JSON.parse(responseText) }
        } catch (e) {
            return e
        }
    },
    deleteTransactions: async function deleteTransactions(token, id, transactionID) {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", "Bearer " + token)
            headers.append("id", id)
            const response = await fetch(`${baseUrl}/transaction/${transactionID}`, { method: "DELETE", headers })
            const responseText = await response.json()
            const status = response.status

            return { status, message: responseText }
        } catch (e) {
            return e
        }
    }

}