import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { DisciplinaProps } from "../type";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListDisciplina: React.FC<DisciplinaProps> = () => {
  const [disciplina, setDisciplina] = useState<DisciplinaProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

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

  async function update({ id }: DisciplinaProps) {
    localStorage.setItem("code-disciplina", id);
    history.push(`/disciplina/edit/${id}`);
  }

  async function deleteItem(params: any) {
    try {
      const id = params?.id;
      const result = await api.delete(`/disciplinaDelete/${id}`);
      Swal.fire("Deletado!", "Disciplina excluído com sucesso.", "success");
      const response = disciplina.filter((data) => data.id !== id);
      setDisciplina(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
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
        title="Disciplinas"
        refresh={disciplina}
        data={disciplina}
        loading={false}
        fields={inscricaoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/disciplina/add"
        scopedSlots={{
          updatedAt: (item: any) => {
            return (
              <>
                <td>
                  <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
                </td>
              </>
            );
          },
          semestreId: (item: any) => {
            return (
              <>
                <td>{item.semestreId + "º"}</td>
              </>
            );
          },
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
                    onClick={() => deleteItem(item)}
                  >
                    Apagar
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

export default ListDisciplina;
