import React, { useEffect, useState } from "react";
import * as S from "./style";
import api from "../../../services/api";

import { AiFillStar } from "react-icons/ai";

//DataTable
export interface InfoProfileProps {
  /*  name: string;
  nif: string;
  dateborn: string;
  ownerName: string;
*/
}

const ListProfile: React.FC<InfoProfileProps> = () => {
  const [salon, setSalon] = useState({
    name: "",
    dateborn: "",
    nif: "",
    ownerId: "",
    ownerName: "",
  });

  const [salonOwnerName, setSalonOwnerName] = useState("");
  const [salonContactEmail, setSalonContactEmail] = useState("");
  const [salonLocationProvince, setSalonLocationProvince] = useState("");
  const [salonLocationMunicipe, setSalonLocationMunicipe] = useState("");

  //Consumindo API
  useEffect(() => {
    async function Salon() {
      try {
        const id = localStorage.getItem("salonId");
        const response = await api.get(`/entity/${id}`);
        setSalon(response.data);

        const owner = await response.data.owner.name;
        setSalonOwnerName(owner);
      } catch (error) {
        console.log("Erro", error);
      }
    }
    Salon();
  }, []);

  //Buscando o email do Salão
  useEffect(() => {
    async function getSalonContactEmail() {
      // const id = localStorage.getItem("salonId");
      try {
        await api.get(`/contact`).then((response) => {
          setSalonContactEmail(response.data[0].content);
          //console.log("Email do Salão: ", salonContactEmail);
        });
      } catch (error) {
        console.log("Erro", error);
      }
    }
    getSalonContactEmail();
  }, []);

  //Buscando a Província do salão
  useEffect(() => {
    async function getSalonLocationProvince() {
      // const id = localStorage.getItem("salonId");
      try {
        await api.get(`/province`).then((response) => {
          setSalonLocationProvince(response.data[0].description);
          // console.log("Provícia do Salão: ", salonLocationProvince);
        });
      } catch (error) {
        console.log("Erro", error);
      }
    }
    getSalonLocationProvince();
  }, []);

  //Buscando a Município do salão
  useEffect(() => {
    async function getSalonLocationMunicipe() {
      //const id = localStorage.getItem("salonId");
      try {
        await api.get(`/municipio`).then((response) => {
          setSalonLocationMunicipe(response.data[1].description);
          // console.log("Município do Salão: ", salonLocationMunicipe);
        });
      } catch (error) {
        console.log("Erro", error);
      }
    }
    getSalonLocationMunicipe();
  }, []);

  return (
    <>
      <S.ProfileSalonInfo className="card">
        <S.ProfileLogo className="image">
          <img src="avatars/5.jpg" alt="Logo do Salão" />
        </S.ProfileLogo>
        <S.TextCenter>
          <S.Title>{salon.name || "undefined"}</S.Title>
        </S.TextCenter>
        <S.Stars>
          <AiFillStar color="yellow" size={14} />
          <AiFillStar color="yellow" size={14} />
          <AiFillStar color="yellow" size={14} />
          <AiFillStar color="yellow" size={14} />
        </S.Stars>

        <S.InfoContent>
          <div>
            <S.SubTitle>Proprietário:</S.SubTitle>
            <S.Paragraph>{salonOwnerName || "Undefined"} </S.Paragraph>
          </div>
          <div>
            <S.SubTitle>Nif:</S.SubTitle>
            <S.Paragraph>{salon.nif || "Undefined"} </S.Paragraph>
          </div>
          <div>
            <S.SubTitle>Data de criação:</S.SubTitle>
            <S.Paragraph>{salon.dateborn || "Undefined"} </S.Paragraph>
          </div>
          <div>
            <S.SubTitle>Contacto:</S.SubTitle>
            <S.Paragraph>943 942 499</S.Paragraph>
          </div>
          <div>
            <S.SubTitle>email:</S.SubTitle>
            <S.Paragraph>{salonContactEmail || "undefined"}</S.Paragraph>
          </div>
          <div>
            <S.SubTitle>Localização:</S.SubTitle>
            <S.Paragraph>
              {salonLocationProvince || "undefined"} ,{" "}
              {salonLocationMunicipe || "undefined"}{" "}
            </S.Paragraph>
          </div>
        </S.InfoContent>
      </S.ProfileSalonInfo>
    </>
  );
};

export default ListProfile;
