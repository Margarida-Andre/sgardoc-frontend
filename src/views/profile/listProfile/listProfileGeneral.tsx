import React, { useEffect, useState } from "react";
import { History } from "history";
import * as S from "./style";
import api from "../../../services/api";
import ProfileSalonInfo from "../profileInfoContent";
import {
  AiOutlineFieldTime,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineAim,
  AiOutlineArrowRight,
} from "react-icons/ai";

//DataTable
export interface listProfileGeneral {
  entryTime: string;
  history: History;
}

const ListProfilePhotos: React.FC<listProfileGeneral> = ({ history }) => {
  const [salon, setSalon] = useState({
    owner: { name: "" },
    typeentity: { description: "" },
  });
  const [salonEmployee, setSalonEmployee] = useState([]);

  const [salonCategory, setCategory] = useState("");
  const [salonDayOfWork, setSalonDayOfWork] = useState([]);

  //Consumindo API
  useEffect(() => {
    async function Salon() {
      try {
        const id = localStorage.getItem("salonId");
        const response = await api.get(`/entity/${id}`);
        setSalon(response.data);
      } catch (error) {
        console.log("Erro", error);
      }
    }
    Salon();
  }, []);

  //Buscando a categoria do Salão
  useEffect(() => {
    async function getSalonCategory() {
      //const id = localStorage.getItem("salonId");
      try {
        await api.get(`/category`).then((response) => {
          setCategory(response.data[0].description);
          //  console.log("Email do Salão: ", salonCategory);
        });
      } catch (error) {
        console.log("Erro", error);
      }
    }
    getSalonCategory();
  }, []);

  //Buscando todos os funcionários do salão
  useEffect(() => {
    async function getSalonEmployee() {
      const result = await api.get("/employee");
      setSalonEmployee(result.data);
      console.log(result.data);
    }
    getSalonEmployee();
  }, []);

  //Buscando todos os funcionários do salão
  useEffect(() => {
    async function getSalonDayOfWork() {
      const result = await api.get("/dayofwork");
      setSalonDayOfWork(result.data);
      console.log(result.data);
    }
    getSalonDayOfWork();
  }, []);

  return (
    <>
      <S.ProfileContainer>
        <ProfileSalonInfo />

        <S.ProfileGeneralInfo className="card">
          <S.GeneralHeader>
            <ul>
              <li>Sobre nós</li>
              <li className="active">Geral</li>
              <li>Fotos</li>
            </ul>
          </S.GeneralHeader>

          <S.ProfileGeneral>
            <S.Title>Mais informações</S.Title>
            <S.ProfileGeneralInfoContent>
              <div>
                <AiOutlineUser size={20} color="#ccc" />
                <S.SubTitle>Tipo de Entidade:</S.SubTitle>
                <S.Paragraph>
                  {salon.typeentity.description || "undefined"}{" "}
                </S.Paragraph>
              </div>
              <div>
                <AiOutlineUser size={20} color="#ccc" />
                <S.SubTitle>
                  Proprietário do {salon.typeentity.description || "Salão"} :
                </S.SubTitle>
                <S.Paragraph>{salon.owner.name || "undefined"} </S.Paragraph>
              </div>
              <div>
                <AiOutlineAim size={20} color="#ccc" />
                <S.SubTitle>
                  Categoria do {salon.typeentity.description || "Salão"}:{" "}
                </S.SubTitle>
                <S.Paragraph>{salonCategory} </S.Paragraph>
              </div>
              <div>
                <AiOutlineUser size={20} color="#ccc" />
                <S.SubTitle>Quantidade de funcionário:</S.SubTitle>
                <S.Paragraph>{salonEmployee.length} funcionários</S.Paragraph>
              </div>

              <div className="profile-list-info">
                <div>
                  <AiOutlineCalendar size={20} color="#ccc" />
                  <S.SubTitle> Dias de Trabalho:</S.SubTitle>{" "}
                  <S.Paragraph>({salonDayOfWork.length} ) dias</S.Paragraph>
                </div>
                <ul>
                  {salonDayOfWork.map((dayOfWork: any) => (
                    <li>
                      <div>
                        <AiOutlineArrowRight size={20} color="#ccc" />
                        <S.Paragraph>
                          {dayOfWork.dayOfWeek.description || "undefined"}{" "}
                        </S.Paragraph>
                      </div>
                      <div>
                        <div>
                          <AiOutlineFieldTime size={20} color="#ccc" />
                          <S.Paragraph>
                            {dayOfWork.entryTime || "undefined"}
                          </S.Paragraph>
                        </div>
                        <div>
                          <AiOutlineFieldTime size={20} color="#ccc" />
                          <S.Paragraph>
                            {dayOfWork.exitTime || "undefined"}
                          </S.Paragraph>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="profile-list-info">
                <div>
                  <AiOutlineCalendar size={20} color="#ccc" />
                  <S.SubTitle> Tratamentos do salão:</S.SubTitle>{" "}
                  <S.Paragraph>(3) tratamentos</S.Paragraph>
                </div>
                <ul>
                  {/*Os controllers para os tramentos de um salão ainda não estão disponíveis*/}
                  <li>
                    <AiOutlineArrowRight size={20} color="#ccc" />
                    <S.Paragraph>Tratamento 1 </S.Paragraph>
                  </li>
                  <li>
                    <AiOutlineArrowRight size={20} color="#ccc" />
                    <S.Paragraph>Tratamento 1 </S.Paragraph>
                  </li>
                  <li>
                    <AiOutlineArrowRight size={20} color="#ccc" />
                    <S.Paragraph>Tratamento 1 </S.Paragraph>
                  </li>
                </ul>
              </div>
            </S.ProfileGeneralInfoContent>
          </S.ProfileGeneral>
        </S.ProfileGeneralInfo>
      </S.ProfileContainer>
    </>
  );
};

export default ListProfilePhotos;
