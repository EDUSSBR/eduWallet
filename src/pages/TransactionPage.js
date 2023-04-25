import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { useTransaction } from "../hooks/useTransaction"
import { useAccount } from "../hooks/useAccount"
import { opacidadeErrorAnim, rotate } from "../style/frames"
import arrow from "../assets/arrow-back-outline.svg"
export default function TransactionsPage() {
  const { account, setAccount, setEmail, setSenha, setSenhaConfirmada, setNome, setErrorMessage } = useAccount()
  const { valor, transactionID,setTransactionID, setUserInfo, setDisableTransaction, setTransactionErrorMessage, disableTransaction, descricao, setValor, setDescricao, doTransaction, transactionErrorMesage } = useTransaction()
  const { tipo, action } = useParams()
  const navigate = useNavigate()
  const valueInputRef = useRef()
  const pageTypes = { types: { entrada: "entrada", saida: "saida" }, actions: { novaTransacao: "nova-transacao", editar: "editar" } }
  // const tipo = { types: { entrada: "entrada", saida: "saída" }, actions: {novaTransacao: "nova-transacao", editar:"editar"}}
  const isNotValidTransaction = !(tipo in pageTypes.types && (action === pageTypes.actions.novaTransacao || action === pageTypes.actions.editar))
  console.log("entrada" in pageTypes.types)
  const isNotValidToken = !(account?.token !== null && account?.token !== undefined && account?.id !== null && account?.id !== undefined)
  console.log(tipo, action)
  if (isNotValidTransaction) {
    navigate("/")
  }
  // if (action !== pageTypes.actions.novaTransacao)
  // tipo === "entrada" ? "entrada" : (tipo === "saida" ? "saída" : navigate("/"))
  useEffect(() => {
    if (transactionErrorMesage.length > 0) {
      setTimeout(() => {
        setTransactionErrorMessage(() => [])
        setDisableTransaction(false)
      }, 3000)
    }
  }, [transactionErrorMesage])
  useEffect(() => {
    if (isNotValidTransaction) {
      navigate('/home')
    }
    if (isNotValidToken) {
      setEmail("")
      setSenha("")
      setNome("")
      setSenhaConfirmada("")
      setUserInfo({})
      setAccount({})
      localStorage.removeItem("accountInfo")
      setErrorMessage(() => ["Houve um problema com a autenticação de sua conta, por façor faça o login novamente."])
      navigate("/")
    }
  }, [account?.token, account?.id, tipo])
  useEffect(() => {
    valueInputRef?.current?.focus()
    if (action==='nova-transacao'){
      setTransactionID("")
    }
  }, [])
  return (
    <TransactionsContainer>
      <TopContainer>
        <h1>{(action !== pageTypes.actions.editar ? "Nova" : "Editar")} {tipo}</h1>
        <img onClick={() => {
          setTransactionID("")
          navigate("/home")
        }} src={arrow} alt="" width="35px" height="35px" />
      </TopContainer>

      <form onSubmit={(e) => doTransaction(e, tipo, action)}>
        {transactionErrorMesage.length > 0 && transactionErrorMesage.map((item, index) => <p key={index}>{item}</p>)}
        <input pattern="^(?:\d+(?:[,.]\d+)?|\d*[,.]\d+)$" value={valor} onChange={(e) => setValor((e.target.value))} placeholder="Valor" type="text" name="valor" ref={valueInputRef} />
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" type="text" name="descricao" />
        <button disabled={disableTransaction} type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TopContainer = styled.div`
width:100%;
display: flex;
justify-content: space-between;
`
const TransactionsContainer = styled.main`

  height: 100%;
  width: 100%;
  max-width: 500px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  animation-name: ${rotate};
    animation-duration: 1s;
  form{
    p{
      font-size:16px;
      color:black;
      font-weight:900;
      /* background-color:white; */
      border-radius:10px;
      animation-name: ${opacidadeErrorAnim};
      animation-duration:6s;
      animation-fill-mode: forwards;
      padding: 6px;
      opacity: 0;
    }
    padding:0px;
    input {
      width: 100%;
    }
  }
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button{
    &:hover{
      background-color: black;
      opacity: 0.7;
    }
  }
  img {
      cursor:pointer;
    }
`
