import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "axios";

export default function Home() {
    return(
        <HomeStyles>
        <p>oi</p>
        <p>ola</p>
        </HomeStyles>
    )
}

const HomeStyles = styled.div`
    margin-top:30px;
    margin-bottom:16px;
    height: calc(100vh - 46px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`