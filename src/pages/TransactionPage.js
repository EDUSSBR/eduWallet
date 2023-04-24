import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { useTransaction } from "../hooks/useTransaction"
import { useAccount } from "../hooks/useAccount"
import { opacidadeErrorAnim, rotate } from "../style/frames"
import arrow from "../assets/arrow-back-outline.svg"
export default function TransactionsPage() {
  const { account, setAccount, setEmail, setSenha,setSenhaConfirmada,setNome,setErrorMessage } = useAccount()
  const { valor,setUserInfo, descricao, setValor, setDescricao, doTransaction, transactionErrorMesage } = useTransaction()
  const { tipo } = useParams()
  const navigate = useNavigate()
  const isNotValidToken = !(account?.token !== null && account?.token !== undefined && account?.id !== null && account?.id !== undefined)
  const tipoDaPagina = tipo === "entrada" ? "entrada" : (tipo === "saida" ? "saída" : navigate("/"))
  useEffect(() => {
    const isNotValidTransaction = !(tipo === "entrada" || tipo === "saida")
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
  return (
    <TransactionsContainer>
      <TopContainer>
        <h1>Nova {tipoDaPagina}</h1>
        <img onClick={() => navigate("/home")} src={arrow} alt="" width="35px" height="35px" />
      </TopContainer>

      <form onSubmit={(e) => doTransaction(e, tipo)}>
        {transactionErrorMesage.length > 0 && transactionErrorMesage.map((item, index) => <p key={index}>{item}</p>)}
        <input pattern="^(\d+|\d+(?:[,.]\d+)*)$" value={valor} onChange={(e) => setValor((e.target.value))} placeholder="Valor" type="text" name="valor" />
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" type="text" name="descricao" />
        <button type="submit">Salvar {tipoDaPagina}</button>
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
      color:red;
      background-color:white;
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
