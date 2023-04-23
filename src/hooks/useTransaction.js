import { createContext, useContext, useState } from "react"
import { services } from "../services"
import { useAccount } from "./useAccount"
import { useNavigate } from "react-router-dom"


const TransactionsContext = createContext({})

export function TransactionProvider({ children }) {
    const [userInfo, setUserInfo] = useState()
    const [valor, setValor] = useState("")
    const [descricao, setDescricao] = useState("")
    const [transactionErrorMesage, setTransactionErrorMessage] = useState("")
    const [newTransactionWasMade, setNewTransactionWasMade] = useState(false)
    const { account } = useAccount()
    const navigate = useNavigate()
    async function doTransaction(e, tipo) {
        try {
            e.preventDefault()
            const numberToSend = Number(valor.trim().replace(",",".")).toFixed(2)
            setValor((prev) => numberToSend.replace('.', ','))
            const response = await services.makeTransaction(numberToSend, descricao, account.token, account.id, tipo)
            if (response.status === 200) {
                navigate("/home")
                setNewTransactionWasMade((prev) => !prev)
                setValor("")
                setDescricao("")
            } else {
                throw response
            }
        } catch (e) {
            const mensagemDeErro = JSON.parse(e.message).map(item=>{
                let message = ""
                let actualMessageSplitted = item.split(" ")
                if (actualMessageSplitted[0] === "\"desc\"" && actualMessageSplitted[6] === '3'){
                    message = "O campo de descrição deve conter pelo menos 3 caracteres."
                } else if (actualMessageSplitted[0] === "\"desc\"") {
                    message = "O campo de descrição da transação é obrigatório."
                } 
                return message
            })
            if (e.message) {
                setTransactionErrorMessage(mensagemDeErro)
            } else {
                setTransactionErrorMessage("Houve um problem com sua conexão tente novamente.")
            }
        }
    }


    return (<TransactionsContext.Provider value={{ userInfo, setUserInfo, valor, descricao, setValor, setDescricao, doTransaction, transactionErrorMesage, setTransactionErrorMessage }}>
        {children}
    </TransactionsContext.Provider>)

}



export function useTransaction() {
    const context = useContext(TransactionsContext)
    return context
}