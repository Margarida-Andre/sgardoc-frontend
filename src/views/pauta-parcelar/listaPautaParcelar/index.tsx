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
    localStorage.setItem("code-estudante", id);
    history.push(`/estudante/edit/${id}`);
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
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListPauta;
