import styled, {AnyStyledComponent} from "styled-components"


//Início Componentes Gerais
export const Title:AnyStyledComponent = styled.h2`
    color: #3c4b64;
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
`

export const SubTitle:AnyStyledComponent = styled.h4`
    color: #3c4b64;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
`
export const Paragraph:AnyStyledComponent = styled.p`
    color: #3c4b64;
    font-size: 14px;
    text-transform: capitalize;
`
export const TextCenter:AnyStyledComponent = styled.div`
    text-align: center;
`
//Fim Componentes Gerais

export const ProfileSalonInfo: AnyStyledComponent = styled.main`
    width: 350px;
    min-height: 75vh;
    max-height: 75vh;
    margin-right: 15px;
    padding: 15px; 
    overflow: auto;

    &::-webkit-scrollbar {
        width: 10px;
        border-radius: 2px;
        border: 1px solid transparent;

        animation-name: ShowScrollAnimation;
        animation-duration: 0.3s;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 2px;
        display: none; 
    }

    @media screen and (max-width: 750px){
        width: 100%;
    }
`
export const ProfileLogo: AnyStyledComponent = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;

    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
    }
`

export const Stars: AnyStyledComponent = styled.main`
    padding: 5px 0px;
    margin-bottom: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: yellow;
`

export const InfoContent:AnyStyledComponent = styled.div`
    width: 100%;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h4 {
            width: 50%;
        }
        p {
            width: 50%;
        }
    }

    @media screen and (max-width: 750px){
        div {
            h4 {
            width: 70%;
        }
        p {
            width: 30%;
        }
        }
    }
`

