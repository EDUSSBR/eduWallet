import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAccount } from "../hooks/useAccount"
import { useEffect } from "react"
import { services } from "../services"
import { useTransaction } from "../hooks/useTransaction"
import { move, opacidadeAnim } from "../style/frames"
import logo from "../assets/logo.webp"
import logo2 from "../assets/logo2.webp"
import { Loader } from "../components/Loader"
export default function SignInPage() {
  const { account, email, senha, setEmail, setAccount, setSenha, setNome, setSenhaConfirmada, autenticarUsuario, errorMessage, setErrorMessage } = useAccount()
  const { setUserInfo } = useTransaction()
  const navigate = useNavigate()
  useEffect(() => {
    (
      async function checkUser() {
        try {
          if (account?.token && account?.id) {
            setErrorMessage(() => ["ContraEncontrada"])
            const response = await services.getTransactions(account?.token, account?.id)
            if (response.status === 200) {
              setUserInfo(() => response.message)
            } else {
              throw ""
            }
            setErrorMessage([])
            navigate("/home")
          }
        } catch (e) {

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
      }
        ())
  }, [account?.token, account?.id, account])
  useEffect(() => {
    if (!(account?.token && account?.id)) {
      setErrorMessage(() => [])
      setEmail("")
      setSenha("")
      setNome("")
      setSenhaConfirmada("")
    }
  }, [])
  return (errorMessage[0] === "ContraEncontrada" ? (<LoaderContainer><p>Detectamos sua conta, aguarde, validando informações...</p>
  <Loader height="40px" width="80px" radius="15px" wrapperStyle={{ background: "inherit" }} />
</LoaderContainer>) :
    (<SingInContainer>
      <form onSubmit={(e) => autenticarUsuario(e)}>
        <picture >
        <source media="(max-width:350px)" srcset={logo2} />
        <img src={logo} alt="logo"/>
      </picture>
        {errorMessage?.length > 0 && (errorMessage?.map((item, i) => <p key={i}>{item}</p>))}
        <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" />
        <input required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" />
        <button type="submit">Entrar</button>
      </form>

      <a href="#" onClick={(e) => {
        e.preventDefault()
        navigate('/cadastro')
      }}>
        Primeira vez? Cadastre-se!
      </a>
    </SingInContainer>)
  )
}

const LoaderContainer = styled.div`
height: 100%;
display: flex;
flex-direction:column;
align-items:center;
justify-content: center;
p{
  text-align:center;
  color: #FEA43D;
  font-size: 20px;
  font-weight:800;
}
`



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
    margin : 30px !important;
    padding-top:0px !important;
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
    height: calc( 15vw + 10px) ;
    max-height:54px;
    min-height:40px;
    border:0px solid transparent;
    &:hover{
      outline: 3px solid #074064; 
    }
    &:focus{
      outline: 3px solid #ed9d34; 
    }
    &:active{
      outline: 3px solid #ed9d34; 
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
