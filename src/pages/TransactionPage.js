import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { useTransaction } from "../hooks/useTransaction"
import { useAccount } from "../hooks/useAccount"

export default function TransactionsPage() {
  const { account } = useAccount()
  const { valor, descricao, setValor, setDescricao, doTransaction, transactionErrorMesage } = useTransaction()
  const { tipo } = useParams()
  const navigate = useNavigate()
  const tipoDaPagina = tipo === "entrada" ? "entrada" : (tipo === "saida" ? "saída" : navigate("/"))
  useEffect(() => {
    if (!(account.token || account.id)) {
      navigate("/")
    }
    const isNotValidTransaction = !(tipo === "entrada" || tipo === "saida")
    if (isNotValidTransaction) {
      navigate('/home')
    }
  }, [account.token, account.id, tipo])
  return (
    <TransactionsContainer>
      <h1>Nova {tipoDaPagina}</h1>
      <form onSubmit={(e) => doTransaction(e, tipo)}>
        {transactionErrorMesage && [transactionErrorMesage].map((item, index) => <p key={index}>{item}</p>)}
        <input pattern="^(\d+|\d*[,.]\d+)$" value={valor} onChange={(e) => setValor((e.target.value))} placeholder="Valor" type="text" name="valor" />
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" type="text" name="descricao" />
        <button type="submit">Salvar {tipoDaPagina}</button>
      </form>
    </TransactionsContainer>
  )
}

const rotate = keyframes`
  0% { transform: rotateY(90deg );}
  100% { transform: rotateY(0deg);}
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
`
