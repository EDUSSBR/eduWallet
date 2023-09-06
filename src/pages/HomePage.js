import styled, { keyframes } from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect } from "react"
import { useAccount } from "../hooks/useAccount"
import { services } from "../services"
import { useNavigate } from "react-router-dom"
import { useTransaction } from "../hooks/useTransaction"
import trashSvg from "../assets/trashicon1.webp"
import { Loader } from "../components/Loader"
// import trashSvg from "../assets/trash-outline.svg"

export default function HomePage() {
  const navigate = useNavigate()
  const { account, logout, setEmail, setSenha, setNome, setSenhaConfirmada, setAccount, setErrorMessage } = useAccount()
  const { deleteTransaction, setDescricao, setValor, setTransactionID, transactionID, setDisableDeleteTransaction, disableDeleteTransaction, userInfo, setUserInfo, newTransactionWasMade, setTransactionErrorMessage } = useTransaction()
  const token = account?.token
  const id = account?.id
  function goToTransactionsPage(e, type) {
    e.preventDefault()
    navigate(`/nova-transacao/${type}`)
  }
  useEffect(() => {

    (async () => {
      try {
        if (token !== null && token !== undefined && id !== null && id !== undefined) {

          const userTransactions = await services.getTransactions(token, id)
          if (userTransactions.status === 200) {
            setDisableDeleteTransaction(() => userTransactions?.transactions?.map(item => false))
            setUserInfo(userTransactions?.message)
            setTransactionErrorMessage("")
          }
        } else {
          throw ''
        }
      } catch (e) {
        setEmail("")
        setSenha("")
        setNome("")
        setSenhaConfirmada("")
        setUserInfo({})
        setAccount({})
        setTransactionID("")
        localStorage.removeItem("accountInfo")
        setErrorMessage(() => ["Houve um problema com a autenticação de sua conta, por façor faça o login novamente."])
        navigate("/")
      }
    }
    )()
  }, [newTransactionWasMade, disableDeleteTransaction, token, id])
  useEffect(() => {
    setTransactionID("")
  }, [])
  return (
    <HomeContainer>
      <Header>
        {(userInfo && <h1>Olá, {userInfo?.nome}</h1>) || <Loader height="26px" width="40" radius="9" wrapperStyle={{ background: "inherit", marginLeft: "28px" }}/>}
        <BiExit color="#5f9ec5" onClick={logout} />
      </Header>

      <TransactionsContainer>

        {(userInfo?.transactions && userInfo?.transactions?.length > 0) ? (<ul>
          {userInfo?.transactions?.map((item, i) =>
            <ListItemContainer color={item.type === "entrada" ? "positivo" : "negativo"} key={item._id}>
              <div onClick={() => {
                setDescricao(item?.desc)
                setTransactionID(item?._id)
                setValor(item?.value.replace(",", "."))
                navigate(`/editar/${item?.type}`)
              }}>
                <span>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(new Date(item.date))}</span>
                <strong>{item.desc}</strong>
              </div>
              <Value>{item?.value.replace(".", ",")}</Value>
              {disableDeleteTransaction?.length > 0 && disableDeleteTransaction[i] === true ?
                (<Loader height="28px" width="25px" radius="25" wrapperStyle={{ marginLeft: "7px" }}/>) : (<img onClick={() => deleteTransaction(item._id)} src={trashSvg} alt="" width="40px" height="40px" />)}
            </ListItemContainer>
          )}
        </ul>) : ((userInfo?.transactions?.length === 0) ? (<MensagemSaldoZero>Não há registros de <br />entrada ou saída</MensagemSaldoZero>) : 
        <Loader height="15px"           width="40"           radius="9" wrapperStyle={{ margin: "auto auto" }} />        )}

        <article>
          <strong>Saldo</strong>
          {!isNaN(userInfo?.saldo) ? (<Saldo color={userInfo?.saldo >= 0 ? "positivo" : "negativo"}>{Number(userInfo?.saldo).toFixed(2).replace(".", ",")}</Saldo>) : 
          <Loader height="15px" width="40" radius="9" wrapperStyle={{ marginLeft: "28px" }} />
          }
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Button onClick={(e) => goToTransactionsPage(e, "entrada")} >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </Button>
        <Button onClick={(e) => goToTransactionsPage(e, "saida")} >
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </Button>
      </ButtonsContainer>
    </HomeContainer>
  )
}
const Button = styled.button`
`
const rotateHome = keyframes`
  0% { transform: rotateX(90deg );}
  100% { transform: rotateX(0deg);}
`
const HomeContainer = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 25px;
    margin: 0 auto;

`
const MensagemSaldoZero = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align:center;
    color: #5f9ec5;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  h1{

    color: #5f9ec5;
  }
  img {
      cursor:pointer;
    }
`
const TransactionsContainer = styled.article`
  img {
    
      cursor:pointer;
    }
  animation-name: ${rotateHome};
  animation-duration: 1s;
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  position: relative;
  height: calc(100% - 143px - 78px);
  div:first-child {
    height: calc(100% - 16px);
    width:100%;
    svg {
      width: 100%;
      margin: auto;
    }
  }
  ul {
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
    height:100%;
    max-height: calc(100% - 16px);
    li{
      display: flex;
      width:100%;
      img{
        margin-left: 5px;
        align-self: flex-end;
      }
    }
    ::-webkit-scrollbar {
  width: 3px;
  border-radius:3px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
    svg {
      display:block;
      width:100%;
      height: calc(100% - 16px);
    }
  }
  article {
    
    position: relative;
    bottom:10px;
    left:23px;
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
      position: absolute;
      bottom: -35px;
      left: -24px;
      color:#5f9ec5;
    }
    div{
      position: absolute;
      bottom: -35px;
      right: 32px;
    }
    svg {
      position: absolute;
      bottom: 0;
      right: 32px;
      display:block;
    }
    }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  

  button {
    background-color: #FEA43D;
    border-radius: 5px;
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;
    padding-top: 9px;
    padding-bottom: 9px;
    &:hover{
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    svg {
      width:25px;
      height:25px;
  }
    p {
      margin-left: 2px;
      font-size: 18px;
      font-family: 'Raleway';
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  
`
const Saldo = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "#4e854e" : "#dd4f17")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #087bc2;
  padding: 4px 5px;
  * &:hover {
    opacity:0.8;
    background-color: #5f9ec5;
    border-radius: 7px;
    color:white;
    -webkit-box-shadow: 0px 16px 18px -13px #5f9ec5;
-moz-box-shadow: 0px 16px 18px -13px #5f9ec5;
box-shadow: 0px 16px 18px -13px #5f9ec5;
    div {
    color: ${(props) => (props.color === "positivo" ? "#00ff00" : "#ff0000")};
    }
    div span, div > strong{
      color: black;
      color:white;
      :hover{
        color:white;
      }
    }
 
  }
  div > span, div > strong {
    color: #79b9e0;
    margin-right: 10px;
 
  }
  div {
    color: ${(props) => (props.color === "positivo" ? "#4e854e" : "#9c2c00")};

  }
`