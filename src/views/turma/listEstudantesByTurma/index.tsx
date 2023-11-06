import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { EstudanteProps } from "../../estudante/type";
import { DisciplinaProps } from "../type";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListEstudantes: React.FC<EstudanteProps> = () => {
  const [estudantes, setEstudantes] = useState<EstudanteProps[]>([]);
  const [disciplina, setDisciplina] = useState([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      const codeTurma = localStorage.getItem("code-turma");
      api.get(`/estudantesTurma/${codeTurma}`).then((response) => {
        setEstudantes(response.data.estudante);
      });
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api
        .get("/disciplinaAll")
        .then((response) => setDisciplina(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: EstudanteProps) {
    localStorage.setItem("code-estudante", id);
    history.push(`/estudante/edit/${id}`);
  }

  async function matricula({ id }: EstudanteProps) {
    localStorage.setItem("code-inscricao", id);
    history.push(`/matricula/add/${id}`);
  }

  async function pautaParcelar(data: DisciplinaProps) {
    localStorage.setItem("code-disciplina", JSON.stringify(data));
    history.push("/pautaParcelar/add");
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
        title="Estudantes"
        refresh={estudantes}
        data={estudantes}
        loading={true}
        fields={inscricaoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/estudante/add"
        scopedSlots={{
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
                      localStorage.setItem("code-estudante-turma", item.id);
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
                    Ver Matrícula
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
                    Disciplinas{" "}
                  </h6>
                  {disciplina.map((value: DisciplinaProps) => {
                    return (
                      <div className="text-muted" style={{ height: "40px" }}>
                        <span
                          className="text-muted"
                          style={{ fontWeight: "bold", marginRight: "5px" }}
                        >
                          {value.descricao}:
                        </span>
                        <CButton
                          size="sm"
                          color="success"
                          className="ml-1"
                          onClick={() => pautaParcelar(value)}
                        >
                          Adicionar nota parcelar
                        </CButton>{" "}
                        |
                        <CButton
                          size="sm"
                          color="success"
                          className="ml-1"
                          onClick={() => pautaParcelar(value)}
                        >
                          Adicionar nota exame
                        </CButton>{" "}
                        |
                        <CButton
                          size="sm"
                          color="success"
                          className="ml-1"
                          onClick={() => pautaParcelar(value)}
                        >
                          Adicionar nota recurso
                        </CButton>{" "}
                        |
                        <CButton
                          size="sm"
                          color="success"
                          className="ml-1"
                          onClick={() => pautaParcelar(value)}
                        >
                          Adicionar nota recuperação
                        </CButton>
                      </div>
                    );
                  })}
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListEstudantes;
