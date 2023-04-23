import styled, { keyframes } from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect } from "react"
import { useAccount } from "../hooks/useAccount"
import { services } from "../services"
import { useNavigate } from "react-router-dom"
import { useTransaction } from "../hooks/useTransaction"
import { ThreeDots } from "react-loader-spinner"

export default function HomePage() {
  const navigate = useNavigate()
  const { account, logout } = useAccount()
  const { userInfo, setUserInfo, newTransactionWasMade, setTransactionErrorMessage } = useTransaction()
  const token = account?.token
  const id = account?.id
  function goToTransactionsPage(e, type) {
    e.preventDefault()
    navigate(`/nova-transacao/${type}`)
  }
  useEffect(() => {

    (async () => {
      try {
        if (token !== null && id !== null) {
          const userTransactions = await services.getTransactions(token, id)
          if (userTransactions.status === 200) {
            setUserInfo(userTransactions.message)
            setTransactionErrorMessage("")
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [newTransactionWasMade, account?.token, account?.id])
  return (
    <HomeContainer>
      <Header>
        {(userInfo && <h1>Olá, {userInfo?.nome}</h1>) || <ThreeDots
          height="26px"
          display='inline'
          width="40"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ marginLeft: "28px" }}
          wrapperClassName=""
          visible={true}
        />}
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        {(userInfo?.transactions) ? (<ul>
          {userInfo?.transactions?.map(item =>
            <ListItemContainer key={item._id}>
              <div>
                <span>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(new Date(item.date))}</span>
                <strong>{item.desc}</strong>
              </div>
              <Value color={item.type === "entrada" ? "positivo" : "negativo"}>{item.value.replace(".",",")}</Value>
            </ListItemContainer>
          )}
        </ul>) : <ThreeDots
          height="15px"
          display='inline'
          width="40"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: "auto auto" }}
          wrapperClassName=""
          visible={true}
        />}

        <article>
          <strong>Saldo</strong>
          {userInfo?.saldo ? (<Saldo color={userInfo?.saldo >= 0 ? "positivo" : "negativo"}>{userInfo?.saldo.replace(".",",")}</Saldo>) : <ThreeDots
            height="15px"
            display='inline'
            width="40"
            radius="9"
            color="gray"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ marginLeft: "28px" }}
            wrapperClassName=""
            visible={true}
          />}
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

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
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
    overflow-y: scroll;
    max-height: calc(100% - 16px);
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
    background-color: #A328D6;
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
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const Saldo = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`