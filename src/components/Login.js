import UserContext from "../contexts/UserContext";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "axios";

export default function Login() {

    const [data, setData] = useState({email:"", password:""});
    const [requesting, setRequesting] = useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    function logUser(e) {
        e.preventDefault();
        setRequesting(true);
        const { email, password } = data;
        const body = {email, password};
        axios.post("http://localhost:4000/sign-in", body).then(answer => {
            setRequesting(false);
            setUser(answer.data);
            history.push("/");
        }).catch(err => {
            console.log(err);
            setRequesting(false);
        })
    }

    return(
        <LoginStyles>
        <p className="logo">MyWallet</p>
        <form onSubmit={logUser}>
            <input required value={data.email} onChange={(e) => setData({...data, email: e.target.value})} placeholder="Email"></input>
            <input required value={data.password} onChange={(e) => setData({...data, password: e.target.value})} placeholder="Senha"></input>
            <button type="submit">{ requesting ? "Entrando..." : "Entrar" }</button>
        </form>
        <p onClick={() => history.push("/sign-up")} className="toggle-sign" >Primeira vez? Cadastr-se!</p>
        </LoginStyles>
    )
}

const LoginStyles = styled.div`
    width:100%;
    height: 33vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 221px;
    padding: 0px 10px;
    .logo{
        font-size: 32px;
        font-family: 'Saira Stencil One', cursive; 
        color:#fff;
        cursor: default;
        margin-bottom: 10px;
        &:hover{
            font-size: 36px;
            margin-bottom: 6px;
        }
    }
    
    form{
        display: flex;
        flex-direction:column;
        align-items: center;
        row-gap: 13px;
        
        input{
            border-style: none;
            outline-style: none;
            border-radius: 5px;
            padding-left: 15px;
            background: ${props => props.requesting ? "#ccc" : "#fff" };
            height:58px;
            width: 90vw;
            max-width: 500px;
            font-size: 20px;
            &::placeholder{
                font-size: 20px;
                color:#000;
            }
        }
        button{
            height:58px;
            width: 90vw;
            max-width: 500px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 5px;
            border-style: none;
            background: #A328D6;
            color:#fff;
            cursor:pointer;
            &:hover{
                font-size: 24px;
            }
        }
    }
    .toggle-sign{
        margin-top:1px;
        font-size: 15px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        color:#fff;
        cursor: pointer;
        &:hover{
            margin-top:0px;
            font-size: 16px;
        }
    }
`