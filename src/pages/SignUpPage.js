import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAccount } from "../hooks/useAccount"
import { move, opacidadeAnim } from "../style/frames"
import { useEffect } from "react"

import logo2 from "../assets/logo2.webp"
import logo from "../assets/logo.webp"
export default function SignUpPage() {
  const { nome, email, senha, senhaConfirmada, setNome,setErrorMessage, setEmail, setSenha,errorMessage, setSenhaConfirmada, criarUsuario } = useAccount()
  useEffect(()=>{
    setErrorMessage(()=>[])
    setEmail("")
    setSenha("")
    setNome("")
    setSenhaConfirmada("")
  },[])
  return (
    <SingUpContainer>
      <form onSubmit={(e)=>criarUsuario(e)}>
      <picture >
        <source media="(max-width:350px)" srcset={logo2} />
        <img src={logo} alt="logo"/>
      </picture>
        
       {errorMessage?.length > 0 && (errorMessage?.map((item,i)=><p key={i}>{item}</p>))}
        <input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" type="text" />
        <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" />
        <input required  value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" autoComplete={"password"} />
        <input required  value={senhaConfirmada} onChange={(e) => setSenhaConfirmada(e.target.value)} placeholder="Confirme a senha" type="password" autoComplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}


const SingUpContainer = styled.section`
  opacity: 1;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-name: ${opacidadeAnim};
  animation-duration: 1s;
  a{
    margin-top:30px;
    padding-top:0px;
    &:hover{
      /* color: black; */
      opacity: 0.7;
    }
  }
  p {
    color: black;
    font-weight:900;
    text-align:center;
    font-size: 16px;
    font-size: 18px;
    animation-name: ${move};
    animation-duration: 1s;
  }
  input{
    &:hover{
      border: 1px solid transparent;
      outline: 3px solid #074064; 
    }
    &:focus{
      outline: 3px solid #ed9d34; 
    }
    &:active{
      outline: 3px solid #ed9d34; 
    }
  }
  button{
    width:100%;
    &:hover{
      background-color: black;
      opacity: 0.7;
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
  img {
    max-width:80%;
    margin-bottom:25px;
  
  }
  picture{
    width:100%;
    display:flex;
    justify-content:center;
  }
  @media (max-width:350px){
    padding:8px;
    input{
      height:40px;
      ::placeholder{
        font-size:0.8em;
      }
    }
    button{
      font-size:1.1em;

    }
    a {
      font-size:0.7em;
    }
  }
`
