import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        box-sizing:border-box;
    }
    main, html, #root, body{
        height:100%;
        width:100%;
    }
    svg {
        cursor: pointer;
    }
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: #FEA43D;
        font-size: 20px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        width: 100%;
        padding: 12px;
        height: calc( 15vw + 10px) ;
    max-height:54px;
    min-height:40px;
    }
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: #5f9ec5;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        :focus {
            border: 2px solid #FEA43D;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #2E6E96;
        text-decoration: none;
        padding-top: 30px;
        :hover{
            color: #FEA43D;
        }
    }
    @keyframes zigzag {
        30% { transform: translateX(-10px)}
        60% { transform: translateX(20px)}
        100% { transform: translateX(-10px)}   
    }
    .rotate {
        animation: zigzag 1s linear;
    }
`

export default GlobalStyle