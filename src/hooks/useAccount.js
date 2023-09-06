import { createContext, useContext, useState } from "react"
import { services } from "../services"
import { useNavigate } from "react-router-dom"

const AccountContext = createContext({})

export function AccountProvider({ children }) {
    const [account, setAccount] = useState(() => JSON.parse(localStorage.getItem("accountInfo") || null))
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState([])
    const [nome, setNome] = useState("")
    const [senhaConfirmada, setSenhaConfirmada] = useState("")
    const navigate = useNavigate()
    //LIMPAR DEPOIS DO CADASTRO
    async function logout(e) {
        try {
            if (!(account.token || account.id)) {
                setEmail("")
                setSenha("")
                setErrorMessage("")
                setAccount("")
                localStorage.removeItem("accountInfo")
                navigate('/')
            } else {
                setEmail("")
                setSenha("")
                setErrorMessage("")
                localStorage.removeItem("accountInfo")
                await services.logout(account.token, account.id)
                setAccount("")
                navigate('/')
            }
        } catch (e) {
            navigate('/')
        }
    }
    async function criarUsuario(e) {
        setErrorMessage((prev) => [])
        try {
            e.preventDefault()
            setErrorMessage(() => [])
            if (senha !== senhaConfirmada) {
                throw { message: ["As senhas escolhidas não possuem valores iguais."] }

            }
            const response = await services.createAccount(nome, email, senha)
            if (response.status === 201) {
                setEmail("")
                setSenha("")
                setNome("")
                setSenhaConfirmada("")
                navigate("/")
            } else if (response.status === 409) {
                throw { message: ["Este usuario já está cadastrado."] }
            } else if (response.status === 422) {
                const mensagemDeErro = JSON.parse(response.message).map(item => {
                    let message = ""
                    let actualMessageSplitted = item.split(" ")
                    if (actualMessageSplitted[0] === "\"email\"") {
                        message = "Por favor, utilize um e-mail válido."
                    } else if (actualMessageSplitted[0] === "\"nome\"" && actualMessageSplitted[6] === '3') {
                        message = "O nome deve conter pelo menos 3 caracteres."
                    } else if (actualMessageSplitted[0] === "\"senha\"" && actualMessageSplitted[6] === '3') {
                        message = "A senha deve conter pelo menos 3 caracteres."
                    }
                    return message
                })
                throw { message: mensagemDeErro }
            } else if (response.message === "Failed to fetch") {
                throw { message: ["Houve um problema com a conexão ao servidor, por favor, tente novamente."] }
            }


        }
        catch (e) {

            if (e.message) {
                setErrorMessage(() => e.message)
            } else {
                setErrorMessage(["Houve um problem com sua conexão tente novamente."])
            }
        }
    }
    async function autenticarUsuario(e) {
        try {
            e.preventDefault()
            setErrorMessage(() => [])
            const response = await services.makeLogin(email, senha)

            if (response.status === 200) {
                localStorage.setItem("accountInfo", response.message)
                setAccount(JSON.parse(response.message))
                navigate("/home")
            } else if (response.message === "Failed to fetch") {
                throw { message: ["Houve um problema com a conexão ao servidor, por favor, tente novamente."] }

            } else {
                throw { message: ["Usuário não encontrado ou senha inválida,", "Por favor, verifique as informações e tente novamente."] }
            }
            navigate('/')
        } catch (e) {
            if (e.message) {
                setErrorMessage(() => e.message)
            } else {
                setErrorMessage(() => ["Houve um problemas com a conexão ao servidor, por favor, tente novamente."])
            }
        }
    }
    return (<AccountContext.Provider value={{ account, setAccount, email, senha, setEmail, setSenha, criarUsuario, autenticarUsuario, setErrorMessage, errorMessage, setErrorMessage, logout, setNome, setSenhaConfirmada, nome, senhaConfirmada }}>
        {children}
    </AccountContext.Provider>)

}

export function useAccount() {
    const context = useContext(AccountContext)
    return context
}