import React, { useState } from "react";
import { PautaProps, PautaData, SemestreProps } from "../type";
import { PautaForm } from "../validations";
import CIcon from "@coreui/icons-react";
import { MdOutlineError } from "react-icons/md";
import { Formik } from "formik";
import "../styles.scss";
import { override } from "../../../global";
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
import ScaleLoader from "react-spinners/ScaleLoader";

const AddPauta: React.FC<PautaProps> = ({
  nota1,
  nota2,
  mediaFinal,
  observacao,
  professorId,
  estudanteId,
  semestreId,
  disciplinaId,
  criadoPor,
  actualizadoPor,
}: PautaData) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);

  let [loading, setLoading] = useState(false);
  const history = useHistory();

  const [pauta, setPauta] = useState<SemestreProps[]>([]);
  const codeDisciplina = JSON.parse(
    localStorage.getItem("code-disciplina") || "{}"
  );

  async function handleCreateNewPauta({
    nota1,
    nota2,
    mediaFinal,
    observacao,
    professorId,
    estudanteId,
    semestreId,
    disciplinaId,
    criadoPor,
    actualizadoPor,
  }: PautaData) {
    try {
      setLoading(true);

      const result = await api.post("/pautaParcelarCreate", {
        nota1,
        nota2,
        mediaFinal: (parseFloat(nota1) + parseFloat(nota2)) / 2,
        observacao: "Dispensado",
        professorId: localStorage.getItem("usuario-logado"),
        estudanteId: localStorage.getItem("code-estudante-turma"),
        semestreId: codeDisciplina.semestreId,
        disciplinaId: codeDisciplina.id,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      setLoading(false);
      Swal.fire("Pauta!", "Nota adicionada com sucesso", "success");
      setPauta([...pauta, result.data]);
      history.push("/pautaParcelar/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/turma/estudantes/list/:id");
  }

  return (
    <CRow>
      {loading ? (
        <ScaleLoader
          color="#39f"
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
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
                Adiciona aqui um estudante
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
                    nota1,
                    nota2,
                    mediaFinal,
                    observacao,
                    professorId: localStorage.getItem("usuario-logado"),
                    estudanteId: localStorage.getItem("code-estudante"),
                    semestreId: codeDisciplina.semestreId,
                    disciplinaId: codeDisciplina.id,
                    criadoPor: localStorage.getItem("usuario-logado"),
                    actualizadoPor: localStorage.getItem("usuario-logado"),
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={PautaForm}
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
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="nota1">Primeira nota</CLabel>
                          <CInput
                            id="nota1"
                            name="nota1"
                            autoComplete="nota1"
                            value={values.nota1}
                            onBlur={handleBlur("nota1")}
                            onChange={handleChange("nota1")}
                            className={errors.nota1 ? "input-error" : "none"}
                          />
                          {errors.nota1 ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.nota1}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="nota2">Segunda nota</CLabel>
                          <CInput
                            id="nota2"
                            name="nota2"
                            autoComplete="nota2"
                            value={values.nota2}
                            onBlur={handleBlur("nota2")}
                            onChange={handleChange("nota2")}
                            className={errors.nota2 ? "input-error" : "none"}
                          />
                          {errors.nota2 ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.nota2}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="mediaFinal">Média final</CLabel>
                          <CInput
                            id="mediaFinal"
                            name="mediaFinal"
                            autoComplete="mediaFinal"
                            value={
                              (parseFloat(values.nota1) +
                                parseFloat(values.nota2)) /
                              2
                            }
                            onBlur={handleBlur("mediaFinal")}
                            onChange={handleChange("mediaFinal")}
                            className={
                              errors.mediaFinal ? "input-error" : "none"
                            }
                            disabled
                          />
                        </CCol>
                      </CFormGroup>

                      <CButton
                        size="sm"
                        color="info"
                        onClick={() => handleCreateNewPauta(values)}
                      >
                        <CIcon name="cil-scrubber" /> Criar pauta
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
      )}
    </CRow>
  );
};

export default AddPauta;
