import React, { useEffect, useState } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody, CImg } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { MatriculaProps } from "../type";
import UploadImg from "../../../assets/user-profile.png";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const ListMatricula: React.FC<MatriculaProps> = () => {
  const [matricula, setMatricula] = useState<MatriculaProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("code-estudante-turma") || "{}"
      );
      api.get(`/matricula/${data.matriculaId}`).then((response) => {
        const result = response.data;
        const array = [];
        array.push(result);
        setMatricula(array);
      });
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: MatriculaProps) {
    localStorage.setItem("data-matricula", id);
    history.push(`/matricula/edit/${id}`);
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
        title="Matrícula"
        refresh={matricula}
        data={matricula}
        loading={false}
        fields={inscricaoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/matricula/add"
        scopedSlots={{
          carregamentoFotografia: (item: any) => (
            <td>
              <div
                className="c-avatar"
                style={{ width: "40px", height: "40px" }}
              >
                <CImg
                  src={
                    item.carregamentoFotografia
                      ? item.carregamentoFotografia
                      : UploadImg
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
                    Opção de curso escolhida{" "}
                  </h6>
                  <div className="lh-base" style={{ fontSize: "0.9rem" }}>
                    <div className="text-muted">
                      <span
                        className="text-muted"
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        Curso:
                      </span>
                      <span>{item.cursoId}</span>
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

export default ListMatricula;
