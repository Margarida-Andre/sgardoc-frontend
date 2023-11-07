import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import { CButton, CCollapse, CCardBody, CImg } from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { DeclaracaoProps } from "../type";
import UploadImg from "../../../assets/user-profile.png";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListInscricao: React.FC<DeclaracaoProps> = () => {
  const [declaracao, setDeclaracao] = useState<DeclaracaoProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      api
        .get("/declaracaoAprovadas")
        .then((response) => setDeclaracao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: DeclaracaoProps) {
    localStorage.setItem("code-declaracao", id);
    history.push(`/declaracao/edit/${id}`);
  }

  async function deleteItem(params: any) {
    try {
      const id = params?.id;
      const result = await api.delete(`/declaracaoDelete/${id}`);
      Swal.fire("Deletada!", "Declaração excluída com sucesso.", "success");
      const response = declaracao.filter((data) => data.id !== id);
      setDeclaracao(response);
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
        title="Inscrições de Exame de Acesso"
        refresh={declaracao}
        data={declaracao}
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

                <CCardBody>
                  <h6
                    className="text-muted"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    Ver Ficheiro{" "}
                  </h6>
                  <a
                    href={item.comprovativoPagamento}
                    download="Comprovativo-de-Pagamento"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <CButton
                      size="sm"
                      color="info"
                      data-coreui-toggle="tooltip"
                      data-coreui-placement="top"
                      title="Baixar comprovativo de pagamento"
                    >
                      Comprovativo de pagamento
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
