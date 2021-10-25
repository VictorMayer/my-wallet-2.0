import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from 'axios';

export default function NewCashFlow() {

    const [ data, setData ] = useState({value:"", description:""});
    const { user } = useContext(UserContext);
    const { type } = useParams();
    const history = useHistory();

    function newFunds(e) {
        e.preventDefault();
        const { value, description } = data;
        const body = { value, description, type };
        const config = { headers: { "Authorization": `Bearer ${user.token}`}};
        axios.post("http://localhost:4000/users", body, config).then(answer => history.push("/")).catch(answer => console.log(answer.response));
    }

    return(
        <NewCashFlowStyle>
            <p className="title">{type === "income" && type !== "expense" ? "Nova Entrada" : "Nova Saída"}</p>
            <form onSubmit={newFunds}>
                <input type="number" required placeholder="Valor" value={data.value} onChange={(e)=>setData({...data, value:e.target.value})}></input>
                <input type="text" required placeholder="Descrição" value={data.description} onChange={(e)=>setData({...data, description:e.target.value})}></input>
                <button type="submit">{type === "income" && type !== "expense" ? "Salvar entrada" : "Salvar saída" }</button>
            </form>
            <IoArrowBackCircleOutline className="icon" onClick={() => history.push("/")}/>
        </NewCashFlowStyle>
    )
}

const NewCashFlowStyle = styled.div`
    display: flex;
    flex-direction: column;
    height:calc(100vh - 25px);
    width:100%;
    margin-top:25px;
    
    .title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 36px;
        font-size: 26px;
        font-weight: 700;
        color:#fff;
    }
    .icon{
        position:fixed;
        color:#fff;
        font-size: 30px;
        right:25px;
        top:22px;
        &:hover{
            font-size: 34px;
            right:23px;
            top:20px;
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
            padding: 0px 15px;
            background: #fff;
            height:58px;
            width: 90vw;
            max-width: 500px;
            font-size:20px;
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
            &:hover{
                font-size: 21px;
            }
        }
    }
`