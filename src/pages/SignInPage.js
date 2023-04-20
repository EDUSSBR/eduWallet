import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useTransaction } from "../hooks/useTransaction"
import { useAccount } from "../hooks/useAccount"

export default function SignInPage() {
  
  const { email, senha, setEmail, setSenha, autenticarUsuario,errorMesage } = useAccount()
  
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        {errorMesage && <p>{errorMesage}</p>}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail" type="email" />
        <input value={senha} onChange={(e)=>setSenha(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" />
        <button onClick={autenticarUsuario}>Entrar</button>
      </form>

      <Link>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
