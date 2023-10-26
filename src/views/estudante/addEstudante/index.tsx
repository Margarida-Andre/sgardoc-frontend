import React, { useEffect, useState, CSSProperties } from "react";
import {
  CursoProps,
  EstudanteProps,
  EstudanteData,
  GrauProps,
  TurmaProps,
  TurnoProps,
} from "../type";
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
//import { useProvincia } from "src/hooks/useProvincia";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
//import { useMunicipio } from "src/hooks/useMunicipio";
//import { useEstadoCivil } from "src/hooks/useEstadoCivil";
//import { useGenero } from "src/hooks/useGenero";
//import { useCurso } from "src/hooks/useCurso";
import api from "src/services/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const AddEstudante: React.FC<EstudanteProps> = ({
  matriculaId,
  usuarioId,
  cursoId,
  grauAcademicoId,
  turmaId,
  turnoId,
  numeroProcesso,
  descricao,
  criadoPor,
  actualizadoPor,
}: EstudanteData) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  let [loading, setLoading] = useState(false);
  const history = useHistory();

  const [grau, setGrau] = useState<GrauProps[]>([]);
  const [turma, setTurma] = useState<TurmaProps[]>([]);
  const [turno, setTurno] = useState<TurnoProps[]>([]);
  const [curso, setCurso] = useState<CursoProps[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numeroBi, setNumeroBi] = useState("");
  const [estudante, setEstudante] = useState<EstudanteProps[]>([]);
  const codeMatricula = localStorage.getItem("code-matricula");

  useEffect(() => {
    try {
      api.get("/cursoAll").then((response) => setCurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  function onSelectCurso(id: any) {
    api
      .get(`/grauAcademico/${id}`)
      .then((response) => setGrau(response.data.grauAcademico));
  }

  function onSelectGrau(id: any) {
    api
      .get(`/turma/grauAcademico/${id}`)
      .then((response) => setTurma(response.data.turma));
  }

  useEffect(() => {
    try {
      api.get("turmaAll").then((response) => setTurma(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api.get("/turnoAll").then((response) => setTurno(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    async function getMatricula() {
      await api
        .get(`/matricula/${codeMatricula}`)
        .then((response) => response.data)
        .then((result) => {
          setNome(result.nome);
          setEmail(result.email);
          setNumeroBi(result.numeroBi);
          console.log(result);
        });
    }
    getMatricula();
  }, [codeMatricula]);

  
  const override: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    borderColor: "#39f",
  };

  async function handleCreateNewEstudante({
    matriculaId,
    usuarioId,
    cursoId,
    grauAcademicoId,
    turmaId,
    turnoId,
    numeroProcesso,
    descricao,
    criadoPor,
    actualizadoPor,
  }: EstudanteData) {
    try {
      const responseUser = await api.post(
        "/usuarioCreate/af0bbaf0-39f3-4192-8d4f-f13412bf17b1",
        {
          nome: nome,
          email: email,
          numeroProcesso,
          senha: numeroBi,
          criadoPor: localStorage.getItem("usuario-logado"),
          actualizadoPor: localStorage.getItem("usuario-logado"),
        }
      );
      setLoading(true);
      const result = await api.post(`/estudanteCreate/${codeMatricula}`, {
        matriculaId: codeMatricula,
        usuarioId: responseUser.data.usuarioCreate.id,
        cursoId,
        grauAcademicoId,
        turmaId,
        turnoId,
        numeroProcesso,
        descricao,
        criadoPor,
        actualizadoPor,
      });
      setLoading(false);
      Swal.fire("Estudante!", "Estudante criado (a) com sucesso", "success");
      setEstudante([...estudante, result.data]);
      history.push("/estudantes/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/estudantes");
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
                  matriculaId: localStorage.getItem("code-estudante"),
                  usuarioId: localStorage.getItem("code-usuario"),
                  cursoId: "",
                  grauAcademicoId: "",
                  turmaId: "",
                  turnoId: "",
                  numeroProcesso: "",
                  descricao: "",
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
                        <CLabel htmlFor="nome">Nome Completo</CLabel>
                        <CInput
                          id="nome"
                          name="nome"
                          autoComplete="nome"
                          value={nome}
                          onChange={(e) =>
                            setNome((e.target as HTMLInputElement).value)
                          }
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInput
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) =>
                            setEmail((e.target as HTMLInputElement).value)
                          }
                          disabled
                        />
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="senha">Senha</CLabel>
                        <CInput
                          id="senha"
                          name="senha"
                          autoComplete="senha"
                          value={numeroBi}
                          onChange={(e) =>
                            setNumeroBi((e.target as HTMLInputElement).value)
                          }
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
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
                          Selecciona um grau acadêmico
                        </CLabel>
                        <CSelect
                          id="grauAcademicoId"
                          name="grauAcademicoId"
                          value={values.grauAcademicoId}
                          onBlur={handleBlur("grauAcademicoId")}
                          onChange={(e) => {
                            handleChange(e);
                            onSelectGrau((e.target as HTMLInputElement).value);
                          }}
                          className={
                            errors.grauAcademicoId ? "input-error" : "none"
                          }
                          autoComplete="grauAcademicoId"
                        >
                          <option value="0">
                            Por favor, seleccione um grau acadêmico
                          </option>
                          {grau.map((item: any) => {
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
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="turmaId">Selecciona uma turma</CLabel>
                        <CSelect
                          id="turmaId"
                          name="turmaId"
                          value={values.turmaId}
                          onBlur={handleBlur("turmaId")}
                          onChange={handleChange("turmaId")}
                          className={errors.turmaId ? "input-error" : "none"}
                          autoComplete="turmaId"
                        >
                          <option value="0">
                            Por favor, selecciona uma turma
                          </option>
                          {turma.map((item: any) => {
                            return (
                              <option value={item.id}>{item.descricao}</option>
                            );
                          })}
                        </CSelect>
                        {errors.turmaId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.turmaId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor=" turnoId">Selecciona um turno</CLabel>
                        <CSelect
                          id=" turnoId"
                          name=" turnoId"
                          value={values.turnoId}
                          onBlur={handleBlur("turnoId")}
                          onChange={handleChange("turnoId")}
                          className={errors.turnoId ? "input-error" : "none"}
                          autoComplete="turnoId"
                        >
                          <option value="0">
                            Por favor, seleccione um turno
                          </option>
                          {turno.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {errors.turnoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.turnoId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="numeroProcesso">
                          Número do processo
                        </CLabel>
                        <CInput
                          id="numeroProcesso"
                          name="numeroProcesso"
                          value={values.numeroProcesso}
                          onBlur={handleBlur("numeroProcesso")}
                          onChange={handleChange("numeroProcesso")}
                          className={
                            errors.numeroProcesso ? "input-error" : "none"
                          }
                          autoComplete="numeroProcesso"
                        />
                        {errors.numeroProcesso ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.numeroProcesso}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="descricao">Descrição</CLabel>
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
                      onClick={() => handleCreateNewEstudante(values)}
                    >
                      <CIcon name="cil-scrubber" /> Criar Estudante
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

export default AddEstudante;
