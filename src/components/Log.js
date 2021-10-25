import styled from "styled-components"

export default function Log({ data }) {

    let totalValue = 0;
    for(let i = 0; i < data.length; i++){
        const value = parseFloat(data[i].value);
        if(data[i].type==="income"){
            totalValue += value;
        } else {
            totalValue -= value;
        }
    }

    return(
        <>
        {data.length === 0 ?
            <EmptyContainer>
                <p>Não há registros de<br/> entrada ou saída</p>
            </EmptyContainer> :
            <>
            <LogContainer>
                <div>
                {data.map((bank, i) => 
                    <CashflowStyle type={bank.type} key={i}>
                        <span>
                            <span className="date">{bank.date.substring(5).replace('-', '/')}</span>
                            <span className="descr">{bank.description.substring(0,1).toUpperCase()+bank.description.substring(1)}</span>
                        </span>
                        <span className="value">{(bank.value/100).toFixed(2).replace(".",",")}</span>
                    </CashflowStyle>                    
                )}
                </div>
            </LogContainer>
            <Bank totalValue={totalValue}>
                <span>SALDO</span>
                <span className="total-value">{(totalValue/100).toFixed(2)}</span>
            </Bank>
            </>
        }
        </>
    )
}

const EmptyContainer = styled.div`
    background:#fff;
    width:100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    color: #868686;
    font-size: 20px;
`
const LogContainer = styled.div`
    background:#fff;
    width:100%;
    height: 100%;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    &>div{
        padding-bottom: 30px;
    }
`
const CashflowStyle = styled.div`
    width:100%;
    height:16px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 23px 12px 18px 12px;
    overflow: hidden;
    .date{
        color:#c6c6c6;
        margin-right: 6px;
    }
    .descr{
        font-size: 16px;
        line-height: 18px;
        overflow: hidden;
    }
    .value{
        color: ${props => props.type !== "expense" && props.type === "income" ? "#03AC00" : "#C70000" }
    }
`
const Bank = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    height: 20px;
    background: #fff;
    border-radius: 0px 0px 5px 5px;
    padding: 14px 12px 15px 15px;
    &>span:nth-child(1){
        font-weight:700;
    }
    .total-value{
        color : ${p => p.totalValue > 0 ? "#03AC00" : p.totalValue < 0 ? "#C70000" : "#000" }
    }
`