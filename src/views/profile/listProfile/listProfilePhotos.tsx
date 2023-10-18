import React from "react";
import * as S from "./style";
import { History } from "history";
import ProfileSalonInfo from "../profileInfoContent";

//DataTable
export interface ProfilePhotosProps {
  photo: string;
  history: History;
}
const ListProfilePhotos: React.FC<ProfilePhotosProps> = ({ history }) => {
  const salonPhotos = [
    "avatars/8.jpg",
    "avatars/1.jpg",
    "avatars/2.jpg",
    "avatars/3.jpg",
    "avatars/4.jpg",
    "avatars/5.jpg",
    "avatars/8.jpg",
    "avatars/6.jpg",
    "avatars/7.jpg",
    "avatars/8.jpg",
    "avatars/3.jpg",
    "avatars/5.jpg",
    "avatars/1.jpg",
    "avatars/5.jpg",
    "avatars/8.jpg",
  ];
  return (
    <>
      <S.ProfileContainer>
        <ProfileSalonInfo />

        <S.ProfileGeneralInfo className="card">
          <S.GeneralHeader>
            <ul>
              <li>Sobre nós</li>
              <li>Geral</li>
              <li className="active">Fotos</li>
            </ul>
          </S.GeneralHeader>
          <S.ProfilePhotos className="profile-photos">
            <S.SubTitle>
              Fotos <span>{salonPhotos.length} </span>
            </S.SubTitle>

            <ul>
              {salonPhotos.map((photo) => (
                <li key={photo}>
                  <img src={photo} alt="" />
                </li>
              ))}
            </ul>
          </S.ProfilePhotos>
        </S.ProfileGeneralInfo>
      </S.ProfileContainer>
    </>
  );
};

export default ListProfilePhotos;
