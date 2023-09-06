import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { AccountProvider } from "./hooks/useAccount"
import { TransactionProvider } from "./hooks/useTransaction"
import { NotFound } from "./pages/NotFound"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
      <AccountProvider>
      <TransactionProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:action/:tipo" element={<TransactionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </TransactionProvider>
        </AccountProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #f8f8f8ea;
  width: 100%;
  /* max-height: 100vh; */
  /* padding: 25px; */
`
