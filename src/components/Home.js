import { RiLogoutBoxRLine, RiAddCircleLine, RiIndeterminateCircleLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext.js";
import { useHistory } from "react-router";
import styled from "styled-components";
import Loader from "./Loader.js";
import Log from "./Log.js";
import axios from "axios";

export default function Home() {

    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [ preloader, setPreloader ] = useState(false);
    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        const config = { headers: {"Authorization": `Bearer ${user.token}`} };
        axios.get("http://localhost:4000/users", config).then((answer) => {
            console.log(answer.data)
            setPreloader(false);
            setUser(answer.data.user);
            setData(answer.data.transactions);
          }).catch((answer) => {
            console.log(answer);
            if(answer.response?.status === 401) history.push("/sign-in");
        })
    }, []);

    function logout() {
        const confirm = window.confirm("Você tem certeza que deseja sair?");
        if (!confirm) return;
        const config = { headers: {"Authorization": `Bearer ${user.token}`} };
        const body = { id: user.id };
        axios.delete("http://localhost:4000/users", { data: body, headers: {"Authorization": `Bearer ${user.token}` } }).then(() => history.push("sign-in")).catch( answer => {console.log(answer); alert("Houve um problema ao sair!")});
    }

    return(
        <HomeStyles>
            { preloader ? <Loader/> :
            <>
                <div className="title">
                    <p>{"Olá, "+user.name?.split(" ")[0]}</p>
                    <span><RiLogoutBoxRLine onClick={logout} className="icon"/></span>
                </div>
                
                <Log data={data}/>
                
                <div className="new-transaction-options">
                    <div className="funds-option" onClick={() => history.push(`/new-cashflow/income`)}>
                        <RiAddCircleLine className="icon"/>
                        <p>Nova<br/> entrada</p>
                    </div>
                    <div className="funds-option" onClick={() => history.push(`/new-cashflow/expense`)}>
                        <RiIndeterminateCircleLine className="icon"/>
                        <p>Nova<br/> saída</p>
                    </div>
                </div>
            </> }
        </HomeStyles>
    )
}

const HomeStyles = styled.div`
    margin-top:30px;
    margin-bottom:16px;
    width:calc(100vw - 48px);
    height: calc(100vh - 46px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 26px;
        font-size: 26px;
        font-weight: 700;
        color:#fff;
        cursor:default;
        p:hover{
            font-size:27px;
            margin-bottom: -1px;
        }
        .icon{
            position: fixed;
            right: 25px;
            top: 25px;
            color: #fff;
            font-size: 32px;
            &:hover{
                font-size:36px;
                right:23px;
                top:23px;
            }
        }
    }
    .new-transaction-options{
        margin-top:13px;
        display: flex;
        justify-content: space-between;
        .funds-option{
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            background: #A328D6;
            color: #fff;
            height:114px;
            padding:10px;
            font-size: 17px;
            font-weight: 700;
            column-gap: 15px;
            border-radius: 5px;
            min-width: 125px;
            width: calc(50vw - 33px);
            .icon{
                font-size: 22px;
            }
            &:hover{
                font-size: 18px;
                padding-top: 9px;
                p{
                    text-shadow: -2px 2px rgba(0,0,0,0.2);
                }
                .icon{
                    font-size:24px;
                }
            }
        }
    }
`