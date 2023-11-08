import React, { FormEvent, useEffect, useState } from "react";
import { CursoData, CursoProps } from "../type";
import CIcon from "@coreui/icons-react";
import "../styles.scss";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFade,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const EditCurso: React.FC<CursoData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const [designacao, setDesignacao] = useState("");

  const [curso, setCurso] = useState<CursoProps[]>([]);

  useEffect(() => {
    async function getCurso() {
      const id = localStorage.getItem("code-curso");
      await api
        .get(`/curso/${id}`)
        .then((response) => response.data)
        .then((result) => {
          setDesignacao(result.designacao);

          console.log(result);
        });
    }
    getCurso();
  }, []);

  async function handleUpdateCurso(event: FormEvent) {
    event.preventDefault();
    try {
      const id = localStorage.getItem("code-curso");
      const result = await api.patch(`/cursoUpdate/${id}`, {
        designacao,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Editado!", "Curso editado com sucesso", "success");
      setCurso([...curso, result.data]);
      history.push("/curso/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/curso/list");
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader
                style={{
                  background: "#39f",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                Edita aqui os cursos
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-setting"
                  >
                    <CIcon name="cil-settings" />
                  </CButton>
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <form onSubmit={handleUpdateCurso}>
                  <CFormGroup row>
                    <CCol xs="12" md="14">
                      <CLabel htmlFor="curso">Designacao</CLabel>
                      <CInput
                        id="designacao"
                        name="designacao"
                        value={designacao}
                        onChange={(e) =>
                          setDesignacao((e.target as HTMLInputElement).value)
                        }
                        autoComplete="designacao"
                      />
                    </CCol>
                  </CFormGroup>

                  <CButton type="submit" size="sm" color="info">
                    <CIcon name="cil-scrubber" /> Editar
                  </CButton>
                  <CButton
                    type="submit"
                    size="sm"
                    color="warning"
                    style={{ marginLeft: "5px" }}
                    onClick={cancelEdit}
                  >
                    <CIcon name="cil-scrubber" /> Cancelar
                  </CButton>
                </form>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default EditCurso;
