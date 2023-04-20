import { createContext, useContext, useState } from "react"
import { services } from "../services"
import { useNavigate } from "react-router-dom"

const AccountContext = createContext({})

export function AccountProvider({ children }) {
    const [account] = useState(() => JSON.parse(localStorage.getItem("accountInfo")))
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMesage, setErrorMessage] = useState()
    const navigate = useNavigate()
    async function autenticarUsuario(e) {
        e.preventDefault()
        const response = await services.makeLogin(email, senha)
        if (response.status === 200) {
            localStorage.setItem("accountInfo", response.message)
            navigate("/home")
        } else {
            setErrorMessage(() => response.message || "Houve algum problema, tente novamente")
        }
    }
    return (<AccountContext.Provider value={{ account, email, senha, setEmail, setSenha, autenticarUsuario, errorMesage }}>
        {children}
    </AccountContext.Provider>)

}

export function useAccount() {
    const context = useContext(AccountContext)
    return context
}