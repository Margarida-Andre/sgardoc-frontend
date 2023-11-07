import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { PautaProps } from "../type";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import "../styles.scss";

const ListPauta: React.FC<PautaProps> = () => {
  const [pauta, setPauta] = useState<PautaProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      api.get("/pautaParcelarAll").then((response) => setPauta(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: PautaProps) {
    localStorage.setItem("code-pauta-parcelar", id);
    history.push(`/pautaParcelar/edit/${id}`);
  }

  async function deleteItem(params: any) {
    try {
      const id = params?.id;
      const result = await api.delete(`/pautaParcelarDelete/${id}`);
      Swal.fire("Deletada!", "Nota excluída com sucesso.", "success");
      const response = pauta.filter((data) => data.id !== id);
      setPauta(response);
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
        title="Pauta Parcelar"
        refresh={pauta}
        data={pauta}
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
                    }}
                  >
                    {details.includes(item.id) ? "Ocultar" : "Mostrar"}
                  </CButton>
                </td>
              </>
            );
          },
          mediaFinal: (item: any) => {
            return (
              <>
                <td>{item.mediaFinal.toFixed()}</td>
              </>
            );
          },
          observacao: (item: any) => {
            return (
              <>
                <td
                  className={
                    item.observacao === "Exame" ||
                    item.observacao === "Dispensado(a)"
                      ? "green-text"
                      : "red-text"
                  }
                >
                  {item.observacao}
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
                  </div>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListPauta;
