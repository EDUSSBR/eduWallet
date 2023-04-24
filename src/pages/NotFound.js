import styled from 'styled-components'
import sad from '../assets/sad-outline.svg'
export function NotFound() {
    return <Container>
        <img width="200px" src={sad} alt="" />
        <p>Not found page.</p>
    </Container>
}


const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    img {
        display: block;
    }
    p{
        display: block;
        font-size: 30px;
        font-weight:900;
    }
`