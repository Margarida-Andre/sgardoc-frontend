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
  notaRecuperacao,
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
    notaRecuperacao,
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

      const result = await api.post("/pautaRecuperacaoCreate", {
        notaRecuperacao,
        mediaFinal: parseFloat(notaRecuperacao),
        observacao:
          parseFloat(notaRecuperacao) > 9 ? "Aprovado(a)" : "Reprovado(a)",
        professorId: localStorage.getItem("usuario-logado"),
        estudanteId: localStorage.getItem("code-estudante-turma"),
        semestreId: codeDisciplina.semestreId,
        disciplinaId: codeDisciplina.id,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      setLoading(false);
      Swal.fire("Pauta Recuperação!", "Nota adicionada com sucesso", "success");
      setPauta([...pauta, result.data]);
      history.push("/pautaRecuperacao/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/pautaRecuperacao/list");
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
                Adiciona aqui notas de recuperação
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
                    notaRecuperacao,
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
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="notaRecuperacao">
                            Nota Recuperação
                          </CLabel>
                          <CInput
                            type="number"
                            id="notaRecuperacao"
                            name="notaRecuperacao"
                            autoComplete="notaRecuperacao"
                            value={values.notaRecuperacao}
                            onBlur={handleBlur("notaRecuperacao")}
                            onChange={handleChange("notaRecuperacao")}
                            className={
                              errors.notaRecuperacao ? "input-error" : "none"
                            }
                          />
                          {errors.notaRecuperacao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.notaRecuperacao}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="mediaFinal">Média final</CLabel>
                          <CInput
                            type="number"
                            id="mediaFinal"
                            name="mediaFinal"
                            autoComplete="mediaFinal"
                            value={parseFloat(values.notaRecuperacao)}
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
