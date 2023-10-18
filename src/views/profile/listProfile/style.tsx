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



export const ProfileContainer: AnyStyledComponent = styled.main`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 750px){
        flex-direction: column;
    }
`

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
            line-height: 0;
        }
        p {
            line-height: 0;
        }
    }

    @media screen and (max-width: 750px){
        div {
            h4 {
                margin-right: 70%;
            }
        }
    }
`

export const ProfileGeneralInfo: AnyStyledComponent = styled.div`
    width: 75%;
    display: flex;

        
    @media screen and (max-width: 750px){
        width: 100%;
    }
`

export const GeneralHeader: AnyStyledComponent = styled.div`
    min-width: 100%;
    border-bottom: 1px solid #ccc;
     ul {
         margin-left: -40px;
         list-style: none;
         display: flex;
         align-items: center;

         li {
             width: 130px;
             background: #ffffff;
             padding: 10px 5px;
             margin-bottom: -16px;
             text-align: center;
             cursor: pointer;
             transition: all .3s;
             border-right: 1px solid #ccc;

             &:hover {
                filter: brightness(90%);
             }
         }
         li.active {
             background: #ccc;
         }
     }
`
export const ProfileAboutUs: AnyStyledComponent = styled.div`
     position: relative;
     width: 100%;
     min-height: 68vh;
     max-height: 68vh;
     overflow: auto;
     padding: 15px;

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

    &:hover {
        &::-webkit-scrollbar-thumb {
            animation-name: ShowScrollAnimation;
            animation-duration: 0.3s;
            display: block;
        }
    }

     h2 {
         margin: 15px 15px 30px;
     }
     h4 {
         font-weight: normal;
         margin: 15px;
     }

    @media screen and (max-width: 750px){
        min-height: 100%;
        max-height: 100%;
    }
`
export const SocialNet: AnyStyledComponent = styled.div`
     margin-top: 60px;
     padding: 15px;

    h2 {
        width: 100%; 
    }
     > div {
         margin: 15px 0;
         display: flex;
         align-items: center;
     }
     p {
         margin: 0px 15px 0;
     }
`

export const ProfileGeneral: AnyStyledComponent = styled.div`
     position: relative;
     width: 100%;
     min-height: 68vh;
     max-height: 68vh;
     overflow: auto;

    padding: 15px;

     @keyframes ShowScrollAnimation {
        from {
            opacity: 0;
            margin: 10px;
        }
        to {
            opacity: 1;
            margin: 0;
        }
    }
    h2 {
        padding: 15px;
    }

    ul{
        list-style: none;
        li {
            display: flex;
            margin: 0;

            p {
                margin-left: 10px;
            }
        }
    }

    @media screen and (max-width: 750px){
        min-height: 100%;
        max-height: 100%;
    }

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

    &:hover {
        &::-webkit-scrollbar-thumb {
            animation-name: ShowScrollAnimation;
            animation-duration: 0.3s;
            display: block;
        }
    }
`
export const ProfileGeneralInfoContent: AnyStyledComponent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;

    div {
        display: flex;
        padding-bottom: 5px;
    }
    div.profile-list-info{
        flex-direction: column;
        li {
            > div {
                width: 50%;
            }
            div + div p {
                margin-right: 30px;
            }
            div + div p + p{
                margin-right: 0px;
            }
        }
    }
    h4 {
        width: 50%;
        margin-left: 10px;
    }
`

export const ProfilePhotos: AnyStyledComponent = styled.div`
      position: relative;
      min-height: 68vh;
      max-height: 68vh;
      overflow: auto;
      padding: 15px;

      ul {
        width: 100%;
        list-style: none;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        li {
            width: 150px;
            height: 150px;
            margin: 7.5px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                cursor: pointer;
            }
        }
        
    }

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

    &:hover {
        &::-webkit-scrollbar-thumb {
            animation-name: ShowScrollAnimation;
            animation-duration: 0.3s;
            display: block;
        }
    }
    @media screen and (max-width: 750px){
        min-height: 100%;
        max-height: 100%;
    }
`
