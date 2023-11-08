import React, { useState } from "react";
import { CursoProps, CursoData } from "../type";
import { InscricaoForm } from "../validations";
import CIcon from "@coreui/icons-react";
import { MdOutlineError } from "react-icons/md";
import { Formik } from "formik";
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
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import api from "src/services/api";

const AddCurso: React.FC<CursoProps> = ({
  designacao,
  criadoPor,
  actualizadoPor,
}: CursoData) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const [curso, setCurso] = useState<CursoProps[]>([]);

  async function handleCreateNewRegister({
    designacao,
    criadoPor,
    actualizadoPor,
  }: CursoData) {
    try {
      const result = await api.post("/cursoCreate", {
        designacao,
        criadoPor,
        actualizadoPor,
      });
      Swal.fire("Curso!", "Curso criado com sucesso", "success");
      setCurso([...curso, result.data]);
      history.push("/curso/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/curso/list");
  }

  return (
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
              Faça aqui a criação de cursos
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
              <Formik
                initialValues={{
                  designacao: "",
                  criadoPor: localStorage.getItem("usuario-logado"),
                  actualizadoPor: localStorage.getItem("usuario-logado"),
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
                validationSchema={InscricaoForm}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  errors,
                }) => (
                  <>
                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="email">Designação</CLabel>
                        <CInput
                          id="designacao"
                          name="designacao"
                          value={values.designacao}
                          onBlur={handleBlur("designacao")}
                          onChange={handleChange("designacao")}
                          className={errors.designacao ? "input-error" : "none"}
                          autoComplete="designacao"
                        />
                        {errors.designacao ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.designacao}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CButton
                      size="sm"
                      color="info"
                      onClick={() => handleCreateNewRegister(values)}
                    >
                      <CIcon name="cil-scrubber" /> Solicitar declaração
                    </CButton>

                    <CButton
                      size="sm"
                      color="warning"
                      style={{ marginLeft: "5px" }}
                      onClick={cancelAdd}
                    >
                      <CIcon name="cil-scrubber" /> Cancelar
                    </CButton>
                  </>
                )}
              </Formik>
            </CCardBody>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
  );
};

export default AddCurso;
