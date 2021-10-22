import styled from "styled-components";
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function Register() {

    const [data, setData] = useState({name:"", email:"", password:"", confirmPassword:""});
    const [requesting, setRequesting] = useState(false);
    const history = useHistory();
    
    function registerUser (e) {
        const { name, email, password, confirmPassword } = data;
        e.preventDefault();
        if (password !== confirmPassword) return alert("As senhas devem ser iguais!");
        setRequesting(true);
        const body = { name, email, password };
        axios.post("http://localhost:4000/sign-up", body).then((answer) => {
            alert("Cadastro concluído!");
            setRequesting(false);
            setData({name:"", email:"", password:"", confirmPassword:""});
            history.push("/sign-in");
        }).catch(err => {
            setRequesting(false);
            setData({...data, password:"", confirmPassword: ""});
            console.log(err);
        })
    }


    return(
        <RegisterStyles requesting={requesting}>
        <p className="logo">MyWallet</p>
        <form onSubmit={registerUser}>
            <input disabled={requesting} value={data.name} onChange={(e) => setData({...data, name: e.target.value})} required type="text" placeholder="Nome"></input>
            <input disabled={requesting} value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required type="email" placeholder="Email"></input>
            <input disabled={requesting} value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required type="password" placeholder="Senha"></input>
            <input disabled={requesting} value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})} required type="password" placeholder="Confirme a senha"></input>
            <button disabled={requesting} type="submit" >{requesting ? "Cadastrando..." : "Cadastrar"}</button>
        </form>
        <p onClick={() => history.push("/sign-in")} className="toggle-sign">Já tem uma conta? Entre agora!</p>
        </RegisterStyles>
    )
}

const RegisterStyles = styled.div`
    width:100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
    .logo{
        font-size: 32px;
        font-family: 'Saira Stencil One', cursive; 
        color:#fff;
        cursor: default;
        margin-bottom: 40px;
        &:hover{
            font-size: 36px;
            margin-bottom: 36px;
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
        margin-top:36px;
        font-size: 15px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        color:#fff;
        cursor: pointer;
        &:hover{
            margin-top:35px;
            font-size: 16px;
        }
    }
`