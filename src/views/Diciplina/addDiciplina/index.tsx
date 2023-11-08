import React, { useState, useEffect } from "react";
import { DisciplinaProps, DisciplinaData } from "../type";
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
  CSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import api from "../../../services/api";

const AddDisciplina: React.FC<DisciplinaProps> = ({
  designacao,
  descricao,
  semestreId,
  grauAcademicoId,
  criadoPor,
  actualizadoPor,
  cursoId,
}: DisciplinaData) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const [disciplina, setDisciplina] = useState<DisciplinaProps[]>([]);
  const [grauAcademico, setGrauAcademico] = useState([]);
  const [curso, setCurso] = useState([]);
  const [semestre, setSemestre] = useState([]);

  useEffect(() => {
    try {
      api.get("/cursoAll").then((response) => setCurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api.get("/semestreAll").then((response) => setSemestre(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  function onSelectCurso(id: any) {
    api
      .get(`/grauAcademico/${id}`)
      .then((response) => setGrauAcademico(response.data.grauAcademico));
  }

  async function handleCreateNewRegister({
    designacao,
    descricao,
    semestreId,
    grauAcademicoId,
    criadoPor,
    actualizadoPor,
  }: DisciplinaData) {
    try {
      const result = await api.post("/disciplinaCreate", {
        designacao,
        descricao,
        semestreId,
        grauAcademicoId,
        criadoPor,
        actualizadoPor,
      });
      Swal.fire("Disciplina!", "Disciplina criada com sucesso", "success");
      setDisciplina([...disciplina, result.data]);
      history.push("/disciplina/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/disciplina/list");
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
              Faça aqui a criação de disciplinas
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
                  cursoId: "",
                  designacao: "",
                  descricao: "",
                  semestreId: "",
                  grauAcademicoId: "",
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
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="cursoId">Selecciona um curso</CLabel>
                        <CSelect
                          id="cursoId"
                          name="cursoId"
                          value={values.cursoId}
                          onBlur={handleBlur("cursoId")}
                          onChange={(e) => {
                            handleChange(e);
                            onSelectCurso(
                              (e.target as HTMLSelectElement).value
                            );
                          }}
                          className={errors.cursoId ? "input-error" : "none"}
                          autoComplete="cursoId"
                        >
                          <option value="0">
                            Por favor, selecciona um curso
                          </option>
                          {curso.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {errors.cursoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.cursoId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="grauAcademicoId">
                          Selecciona o grau acadêmico
                        </CLabel>
                        <CSelect
                          id="grauAcademicoId"
                          name="grauAcademicoId"
                          value={values.grauAcademicoId}
                          onBlur={handleBlur("grauAcademicoId")}
                          onChange={handleChange("grauAcademicoId")}
                          className={
                            errors.grauAcademicoId ? "input-error" : "none"
                          }
                          autoComplete="grauAcademicoId"
                        >
                          <option value="0">
                            Por favor, selecciona um grau
                          </option>
                          {grauAcademico.map((item: any) => {
                            return (
                              <option value={item.id}>{item.descricao}</option>
                            );
                          })}
                        </CSelect>
                        {errors.grauAcademicoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.grauAcademicoId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="semestreId">
                          Selecciona o semestre
                        </CLabel>
                        <CSelect
                          id="semestreId"
                          name="semestreId"
                          value={values.semestreId}
                          onBlur={handleBlur("semestreId")}
                          onChange={handleChange("semestreId")}
                          className={errors.semestreId ? "input-error" : "none"}
                          autoComplete="semestreId"
                        >
                          <option value="0">
                            Por favor, selecciona o semestre
                          </option>
                          {semestre.map((item: any) => {
                            return (
                              <option value={item.id}>
                                {item.descricao + "º"}
                              </option>
                            );
                          })}
                        </CSelect>
                        {errors.semestreId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.semestreId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
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

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="email">Descrição</CLabel>
                        <CInput
                          id="descricao"
                          name="descricao"
                          value={values.descricao}
                          onBlur={handleBlur("descricao")}
                          onChange={handleChange("descricao")}
                          className={errors.descricao ? "input-error" : "none"}
                          autoComplete="descricao"
                        />
                        {errors.descricao ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.descricao}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CButton
                      size="sm"
                      color="info"
                      onClick={() => handleCreateNewRegister(values)}
                    >
                      <CIcon name="cil-scrubber" /> Criar disciplinas
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

export default AddDisciplina;
