import React from "react";
import * as S from "./style";
import { History } from "history";
import ProfileSalonInfo from "../profileInfoContent";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

//DataTable
export interface ProfileProps {
  history: History;
  ProfileSalonInfo: any;
  name: string;
  nif: string;
  dateborn: string;
  ListProfile: any;
}

const ListProfile: React.FC<ProfileProps> = () => {
  return (
    <>
      <S.ProfileContainer>
        <ProfileSalonInfo />

        <S.ProfileGeneralInfo className="card">
          <S.GeneralHeader>
            <ul>
              <li className="profile-btn1 active">Sobre Salão</li>
              <li className="profile-btn2">Geral</li>
              <li className="profile-btn3">Fotos</li>
            </ul>
          </S.GeneralHeader>

          <S.ProfileAboutUs className="profile-about-us">
            {/* Ainda não existe controllers para estes campos*/}
            <div>
              <S.Title>Crespoline, somos a sua melhor escolha</S.Title>
            </div>
            <div>
              <S.SubTitle>
                A Crespoline tem o melhor serviço para você. A Crespoline tem o
                melhor serviço para você. Venha aderir os nossos serviços.
              </S.SubTitle>

              <S.SubTitle>
                Crespoline tem o melhor serviço para você. A CresA Crespoline
                tem o melhor serviço para você. A Crespoline tem o melhor
                serviço para você. Saiba escolher o melhor salão e nós somos a
                sua melhor escolha A Crespoline tem o melhor serviço para você.
              </S.SubTitle>

              <S.SubTitle>
                Achamos o melhor serviço para ti pois tu és a nossa prioridade,
                Lorem impsum siti dolor amet consecutir e sabemos fazer muito
                bem os nossos serviços Venha provar dos nossos serviços. Achamos
                o melhor serviço para ti pois tu és a nossa prioridade, Lorem
                impsum siti.
              </S.SubTitle>
            </div>
            <S.SocialNet>
              <S.Title>Redes Socias:</S.Title>
              <div className="facebook">
                <AiFillFacebook size={30} color="#1b74b4" />
                <S.Paragraph>
                  <a href="facebook">www.facebook.com</a>{" "}
                </S.Paragraph>
              </div>
              <div className="instagram">
                <AiFillInstagram size={30} color="red" />
                <S.Paragraph>
                  <a href="instagram">www.instagram.com</a>{" "}
                </S.Paragraph>
              </div>
            </S.SocialNet>
          </S.ProfileAboutUs>
        </S.ProfileGeneralInfo>
      </S.ProfileContainer>
    </>
  );
};

export default ListProfile;
