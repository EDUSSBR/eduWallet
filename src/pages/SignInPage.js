import styled, { keyframes } from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useAccount } from "../hooks/useAccount"
import { useEffect, useState } from "react"
import { services } from "../services"
import { useTransaction } from "../hooks/useTransaction"
import { ThreeDots } from "react-loader-spinner"
import { opacidadeAnim } from "./SignUpPage"

export default function SignInPage() {
  const { account, email, senha, setEmail, setSenha, autenticarUsuario, errorMessage, setErrorMessage } = useAccount()
  const { setUserInfo } = useTransaction()
  const navigate = useNavigate()

  useEffect(() => {
    (
      async function checkUser() {
        try {
          if (account?.token && account?.id) {
            setErrorMessage("Detectamos sua conta, aguarde, validando informações...")
            const response = await services.getTransactions(account.token, account.id)
            if (response.status===200) {
              setUserInfo(response.message)
              navigate("/home")
            } else {
              throw ""
            }
          }
        } catch (e) {
            setErrorMessage(() => "Houve um problema com a autenticação de sua conta, por façor faça o login novamente.")
        }
      }
        ())
}, [account?.token, account?.id])
return ( errorMessage==="Detectamos sua conta, aguarde, validando informações..." ? (<ThreeDotsContainer><p>Detectamos sua conta, aguarde, validando informações...</p><ThreeDots
          height="40px"
          display='inline'
          width="80px"
          radius="15"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ background: "#9054BE" }}
          wrapperClassName=""
          visible={true}
        /> </ThreeDotsContainer>) :
 ( <SingInContainer>
    <form onSubmit={(e)=> autenticarUsuario(e)}>
      <MyWalletLogo />
      {errorMessage?.length > 0 && (errorMessage?.map((item,i)=><p key={i}>{item}</p>))}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" />
      <input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" />
      <button type="submit">Entrar</button>
    </form>

    <a href="#" onClick={(e)=>{
      e.preventDefault()
      navigate('/cadastro')
    } }>
      Primeira vez? Cadastre-se!
    </a>
  </SingInContainer>)
  )
}

const ThreeDotsContainer = styled.div`
height: 100%;
display: flex;
flex-direction:column;
align-items:center;
justify-content: center;
p{
  text-align:center;
  color: white;
  font-size: 20px;
  font-weight:800;
}
`

const move = keyframes`
 0% { margin : 0px 0px; opacity:0}
 50% { margin : 5px 0px; opacity:1}
 100% { margin: 0px; opacity: 1; }
`

// const zigzag = keyframes`
//  30% { transform: rotate(-2deg)}
//  60% { transform: rotate(2deg)}
//  100% { transform: rotate(0deg)}
// `

const SingInContainer = styled.section`
  padding:25px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${opacidadeAnim};
  animation-duration:1s;
  a{
    &:hover{
      color: black;
      opacity: 0.7;
    }
  }
  p {
    opacity: 1;
    color: #5e070b;
    animation-name: ${move};
    animation-duration: 1s;
  }
  button{
    width:100%;
    &:hover{
      background-color: black;
      opacity: 0.7;
    }
  }
  input{
    border:0px solid transparent;
    &:hover{
      outline: 3px solid #58388c; 
      /* border: 1px solid transparent; */
    }
    &:focus{
      outline: 3px solid #E1ED34; 
      /* border: 1px solid transparent; */
    }
    &:active{
      outline: 3px solid #E1ED34; 
      /* border: 1px solid transparent; */
    }
  }
  form{
    input{
      width: 100%;
      max-width:500px;
      
    }
    width: 100%;
    max-width:500px;
  }

`
