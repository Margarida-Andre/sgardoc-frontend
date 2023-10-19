import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody, CImg } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { InscricaoProps } from "../type";
//import { useInscricao } from "../../../hooks/useInscricao";
import UploadImg from "../../../assets/user-profile.png";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListInscricao: React.FC<InscricaoProps> = () => {
  const [inscricao, setInscricao] = useState<InscricaoProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      api
        .get("/inscricoesAprovadas")
        .then((response) => setInscricao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: InscricaoProps) {
    localStorage.setItem("data-inscricao", id);
    history.push(`/inscricao/edit/${id}`);
  }

  async function matricula({ id }: InscricaoProps) {
    localStorage.setItem("code-inscricao", id);
    history.push(`/matricula/add/${id}`);
  }

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <>
      <PSTable
        title="Inscrições de Exame de Acesso"
        refresh={inscricao}
        data={inscricao}
        loading={false}
        fields={inscricaoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/inscricao/add"
        scopedSlots={{
          carregamentoFotografia: (item: any) => (
            <td>
              <div
                className="c-avatar"
                style={{ width: "40px", height: "40px" }}
              >
                <CImg
                  src={
                    item.carregamentoFotografia === "" ||
                    item.carregamentoFotografia ===
                      "../../../assets/user-profile.png"
                      ? UploadImg
                      : item.carregamentoFotografia
                  }
                  className="c-avatar-img"
                  alt="photo"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </td>
          ),
          dataNascimento: (item: any) => (
            <td>
              <Moment format="DD/MM/YYYY">{item.dataNascimento}</Moment>
            </td>
          ),
          actions: (item: any) => {
            return (
              <>
                <td>
                  <CButton
                    color="info"
                    size="sm"
                    className="ml-2"
                    onClick={() => {
                      toggleDetails(item.id);
                    }}
                  >
                    {details.includes(item.id) ? "Ocultar" : "Mostrar"}
                  </CButton>
                </td>
              </>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.id)}>
                <CCardBody>
                  <p className="text-muted">
                    Criado (a) desde:{" "}
                    <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>
                  </p>

                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => update(item)}
                  >
                    Editar
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => matricula(item)}
                  >
                    Matricular Estudante
                  </CButton>
                </CCardBody>

                <CCardBody>
                  <h6
                    className="text-muted"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Mais detalhes{" "}
                  </h6>
                  <div className="lh-base" style={{ fontSize: "0.9rem" }}>
                    <div className="text-muted d-flex flex-row align-items-center">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Data de nascimento:
                      </span>
                      <Moment format="DD/MM/YYYY">{item.dataNascimento}</Moment>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Gênero:
                      </span>
                      <span>{item.generoId}</span>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Provícia:{" "}
                      </span>
                      <span>{item.provinciaId}</span>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Município:
                      </span>
                      <span>{item.municipioId}</span>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Estado Civil:
                      </span>
                      <span>{item.estadoCivilId}</span>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Telefone principal:
                      </span>
                      <span>{item.telefonePrincipal}</span>
                    </div>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Telefone alternativo:
                      </span>
                      <span>{item.telefoneAlternativo}</span>
                    </div>

                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Criado por:
                      </span>
                      <span>{item.criadoPor}</span>
                    </div>

                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Actualizado por:
                      </span>
                      <span>{item.actualizadoPor}</span>
                    </div>

                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Última actualização:
                      </span>
                      <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>
                    </div>
                  </div>
                  <br />
                  <br />
                  <h6
                    className="text-muted"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Opções de cursos escolhidos{" "}
                  </h6>
                  <div className="lh-base" style={{ fontSize: "0.9rem" }}>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Opção 1:
                      </span>
                      <span>{item.opcao1CursoId}</span>
                    </div>

                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Opção 2:
                      </span>
                      <span>{item.opcao2CursoId}</span>
                    </div>
                  </div>
                </CCardBody>

                <CCardBody>
                  <h6
                    className="text-muted"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Ver Documentos{" "}
                  </h6>
                  <a
                    href={item.carregamentoBi}
                    download="Bilhete-de-Identidade"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <CButton
                      size="sm"
                      color="info"
                      data-coreui-toggle="tooltip"
                      data-coreui-placement="top"
                      title="Baixar bilhete de identidade"
                    >
                      BI
                    </CButton>
                  </a>

                  <a
                    href={item.certificadoEnsinoMedio}
                    download="Bilhete-de-Identidade"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CButton
                      size="sm"
                      color="info"
                      style={{ marginLeft: "5px" }}
                      data-coreui-toggle="tooltip"
                      data-coreui-placement="top"
                      title="Baixar certificado"
                    >
                      Certificado do Ensino Médio
                    </CButton>
                  </a>

                  <a
                    href={item.comprovativoPagamento}
                    download="Bilhete-de-Identidade"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CButton
                      size="sm"
                      color="info"
                      style={{ marginLeft: "5px" }}
                      data-coreui-toggle="tooltip"
                      data-coreui-placement="top"
                      title="Baixar comprovativo"
                    >
                      Comprovativo de Pagamento
                    </CButton>
                  </a>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListInscricao;
