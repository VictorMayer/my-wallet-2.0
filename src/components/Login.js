import styled from "styled-components"

export default function Login() {
    return(
        <LoginStyles>
        <p>MyWallet</p>
        <form>
            <input></input>
            <input></input>
            <button></button>
        </form>
        <p>Primeira vez? Cadastr-se!</p>
        </LoginStyles>
    )
}

const LoginStyles = styled.div`

    form{
        display: flex;
        flex-direction: column;
    }
`