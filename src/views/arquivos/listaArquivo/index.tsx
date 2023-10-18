import React, { useState } from "react";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { arquivoTableFields } from "./tableSettins/fields";
import { ArquivosProps } from "../type";
import { useArquivo } from "../../../hooks/useArquivo";
import { useHistory } from "react-router-dom";

const ListArquivo: React.FC<ArquivosProps> = () => {
  const [details, setDetails] = useState<any[]>([]);
  const { arquivo, deleteArquivo } = useArquivo();
  const history = useHistory();

  async function update({ ID_ARQUIVO }: ArquivosProps) {
    localStorage.setItem("data-arquivo", ID_ARQUIVO);
    history.push(`/arquivo/edit/${ID_ARQUIVO}`);
  }

  async function handleDelete(data: ArquivosProps) {
    await deleteArquivo(data);
    history.push("/arquivo/list");
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
        refresh={arquivo}
        title="Arquivos Cadastrados"
        data={arquivo}
        loading={false}
        fields={arquivoTableFields}
        itemsPerPage={5}
        linkAddNewRow="/arquivo/add"
        scopedSlots={{
          actions: (item: any) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    toggleDetails(item.ID_ARQUIVO);
                  }}
                >
                  {details.includes(item.ID_ARQUIVO) ? "Ocultar" : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.ID_ARQUIVO)}>
                <CCardBody>
                  <p className="text-muted">
                    Criado (a) desde: {item.createdAt}
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
                    onClick={() => handleDelete(item)}
                  >
                    Apagar
                  </CButton>
                  <CButton size="sm" color="success" className="ml-1">
                    Mais Detalhes
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

export default ListArquivo;
