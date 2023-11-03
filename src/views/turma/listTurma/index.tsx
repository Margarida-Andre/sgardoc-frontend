import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { TurmaProps } from "../type";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListTurma: React.FC<TurmaProps> = () => {
  const [turma, setTurma] = useState<TurmaProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      api.get("/turmaAll").then((response) => setTurma(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: TurmaProps) {
    localStorage.setItem("code-turma", id);
    history.push(`/turma/edit/${id}`);
  }

  async function verEstudante({ id }: TurmaProps) {
    localStorage.setItem("code-turma", id);
    history.push(`/turma/estudantes/list/${id}`);
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
        title="Turmas"
        refresh={turma}
        data={turma}
        loading={true}
        fields={inscricaoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/turma/add"
        scopedSlots={{
          inicioAnoLectivo: (item: any) => (
            <td>
              <Moment format="DD/MM/YYYY">{item.inicioAnoLectivo}</Moment>
            </td>
          ),
          finalAnoLectivo: (item: any) => (
            <td>
              <Moment format="DD/MM/YYYY">{item.finalAnoLectivo}</Moment>
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
                    onClick={() => verEstudante(item)}
                  >
                    Ver Estudantes
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListTurma;
