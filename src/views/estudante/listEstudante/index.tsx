import React, { useState, useEffect } from "react";
import { PSTable } from "../../../shared/components/Table/index";
import {
  CButton,
  CCollapse,
  CCardBody,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from "@coreui/react";
import { inscricaoTableFields } from "./tableSettins/fields";
import { EstudanteProps } from "../type";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import api from "src/services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const ListEstudante: React.FC<EstudanteProps> = () => {
  const [estudante, setEstudante] = useState<EstudanteProps[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      api.get("/estudanteAll").then((response) => setEstudante(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function update({ id }: EstudanteProps) {
    localStorage.setItem("code-estudante", id);
    history.push(`/estudante/edit/${id}`);
  }

  async function matricula(data: EstudanteProps) {
    localStorage.setItem("code-estudante-turma", JSON.stringify(data));
    history.push("/turma/estudante/matricula");
  }

  async function declaracao({ id }: EstudanteProps) {
    localStorage.setItem("code-estudante", id);
    history.push("/declaracao/add");
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
        refresh={estudante}
        data={estudante}
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

                  <CDropdown className="btn-group ml-1">
                    <CDropdownToggle color="info">
                      Solicitar documento
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">
                        Histórico com notas
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem href="#" onClick={() => declaracao(item)}>
                        Declaração de Estudos
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem href="#">Requerimento</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
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

export default ListEstudante;
