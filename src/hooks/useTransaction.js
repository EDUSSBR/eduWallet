import { createContext, useContext, useState } from "react"
import { services } from "../services"
import { useAccount } from "./useAccount"
import { useNavigate } from "react-router-dom"


const TransactionsContext = createContext({})

export function TransactionProvider({ children }) {
    const [userInfo, setUserInfo] = useState({})
    const [valor, setValor] = useState("")
    const [descricao, setDescricao] = useState("")
    const [transactionErrorMesage, setTransactionErrorMessage] = useState([])
    const [newTransactionWasMade, setNewTransactionWasMade] = useState(false)
    const { account } = useAccount()
    const [disableTransaction, setDisableTransaction] = useState(false)
    const [disableDeleteTransaction, setDisableDeleteTransaction] = useState([])
    const navigate = useNavigate()

    async function doTransaction(e, tipo) {
        try {
            setDisableTransaction(()=> true)
            e.preventDefault()
            const numberToSend = Number(valor.trim().replace(",", ".")).toFixed(2)
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
            setDisableTransaction(()=> false)
        } catch (e) {
            setDisableTransaction(()=> false)
            console.log(e)
             if (e.message && e.message !== "Failed to fetch" ) {
                const mensagemDeErro = JSON.parse(e.message).map(item => {
                    let message = ""
                    let actualMessageSplitted = item.split(" ")
                    if (actualMessageSplitted[0] === "\"desc\"" && actualMessageSplitted[6] === '3') {
                        message = "O campo de descrição deve conter pelo menos 3 caracteres."
                    } else if (actualMessageSplitted[0] === "\"desc\"") {
                        message = "O campo de descrição da transação é obrigatório."
                    }
                    return message
                })
                setTransactionErrorMessage(() => mensagemDeErro)
            } else {
                setTransactionErrorMessage(() => ["Houve um problem com sua conexão, por favor, tente novamente."])
            }
        }
    }

    async function deleteTransaction(id) {
        const shouldDelete = window.confirm("Voce realmente deseja deletar esse item?")
        if (!shouldDelete){
            return
        }
        const index = userInfo.transactions.findIndex(item=> item._id===id)
        const newArrOfDisableds = [...userInfo.transactions]
        newArrOfDisableds[index] = true 
        setDisableDeleteTransaction(prev=>newArrOfDisableds)
        try {
            const response = await services.deleteTransactions(account.token, account.id, id)
            if (response.status === 200) {
                setUserInfo(()=> response.message[0])
            }
            newArrOfDisableds[index] = false 
            setDisableDeleteTransaction(prev=>newArrOfDisableds)
        } catch (e) {
            console.log(e)
            setDisableDeleteTransaction(prev=>newArrOfDisableds)
        }
    }

    return (<TransactionsContext.Provider value={{ disableTransaction,setDisableDeleteTransaction,disableDeleteTransaction,userInfo, deleteTransaction, setUserInfo, valor, descricao, setValor, setDescricao, doTransaction, transactionErrorMesage, setTransactionErrorMessage }}>
        {children}
    </TransactionsContext.Provider>)

}



export function useTransaction() {
    const context = useContext(TransactionsContext)
    return context
}