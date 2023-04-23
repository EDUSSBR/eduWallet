import { createContext, useContext, useState } from "react"
import { services } from "../services"
import { useNavigate } from "react-router-dom"

const AccountContext = createContext({})

export function AccountProvider({ children }) {
    const [account, setAccount] = useState(() => JSON.parse(localStorage.getItem("accountInfo")))
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState([])
    const navigate = useNavigate()

    async function logout(e) {
        try{
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
                await services.logout(account.token, account.id)
                localStorage.removeItem("accountInfo")
                setAccount("")
                navigate('/')
            }
        } catch (e){

        }
    }
    async function autenticarUsuario(e) {
        e.preventDefault()
        setErrorMessage(()=>[])
        const response = await services.makeLogin(email, senha)
        if (response.status === 200) {
            localStorage.setItem("accountInfo", response.message)
            setAccount(JSON.parse(response.message))
            navigate("/home")
        } else {
                        // console.log(JSON.parse(response.message))
            // const mensagemDeErro = JSON.parse(response.message).map(item=>{
            //     let message = ""
            //     console.log(item)
            //     let actualMessageSplitted = item.split(" ")
            //     if (actualMessageSplitted[0] === "\"email\""){
            //         message = "Por favor utilize um e-mail válido."
            //     } else if (actualMessageSplitted[0] === "\"senha\"") {
            //         message = "Usuário não encontrado ou invalida."
            //     } 
            //     return message
            // })
            setErrorMessage(() => ["Usuário não encontrado ou senha inválida,","Por favor, verifique as informações e tente novamente."])
        }
    }
    return (<AccountContext.Provider value={{ account, email, senha, setEmail, setSenha, autenticarUsuario, setErrorMessage, errorMessage, logout }}>
        {children}
    </AccountContext.Provider>)

}

export function useAccount() {
    const context = useContext(AccountContext)
    return context
}