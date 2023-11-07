import React, { useEffect, useState } from "react";
import {
  DeclaracaoProps,
  DeclaracaoData,
  EfeitoProps,
  TipoProps,
  DuracaoProps,
  GrauProps,
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
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { UploadComprovativo } from "../upload/upload-comprovativo";
import api from "src/services/api";
//import { cursosData } from "../../estudante/mocks";

const AddDeclaracao: React.FC<DeclaracaoProps> = ({
  cursoId,
  estudanteId,
  grauAcademicoId,
  estadoId,
  email,
  telefonePrincipal,
  telefoneAlternativo,
  tipoDeclaracaoId,
  duracaoDeclaracaoId,
  efeitoDeclaracaoId,
  outroEfeito,
  comprovativoPagamento,
  criadoPor,
  actualizadoPor,
}: DeclaracaoData) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();

  const [declaracao, setDeclaracao] = useState<DeclaracaoProps[]>([]);
  const [efeito, setEfeito] = useState<EfeitoProps[]>([]);
  const [tipo, setTipo] = useState<TipoProps[]>([]);
  const [grauAcademico, setGrauAcademico] = useState<GrauProps[]>([]);
  const [duracao, setDuracao] = useState<DuracaoProps[]>([]);
  const [curso, setCurso] = useState([]);

  const comprovativo = () => {
    if (localStorage.getItem("firebase-comprovativo") === null) {
      return "vazio";
    } else {
      return localStorage.getItem("firebase-comprovativo");
    }
  };

  useEffect(() => {
    try {
      api
        .get("/duracaoDeclaracao")
        .then((response) => setDuracao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api.get("/efeitoDeclaracao").then((response) => setEfeito(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

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
      .then((response) => setGrauAcademico(response.data.grauAcademico));
  }

  useEffect(() => {
    try {
      api.get("/tipoDeclaracao").then((response) => setTipo(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function handleCreateNewRegister({
    estudanteId,
    grauAcademicoId,
    estadoId,
    email,
    telefonePrincipal,
    telefoneAlternativo,
    tipoDeclaracaoId,
    duracaoDeclaracaoId,
    efeitoDeclaracaoId,
    outroEfeito,
    comprovativoPagamento,
    criadoPor,
    actualizadoPor,
  }: DeclaracaoData) {
    try {
      const result = await api.post("/declaracaoCreate", {
        estudanteId,
        grauAcademicoId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        tipoDeclaracaoId,
        duracaoDeclaracaoId,
        efeitoDeclaracaoId,
        outroEfeito,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      });
      Swal.fire("Requisição (a)!", "Requisição feita com sucesso", "success");
      setDeclaracao([...declaracao, result.data]);
      history.push("/declaracao/aprovadas/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  function cancelAdd() {
    history.push("/declaracao/aprovadas");
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
              Faça aqui requisição de declaração de estudos
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
                  estudanteId: localStorage.getItem("code-estudante"),
                  grauAcademicoId: "",
                  estadoId: 2,
                  email: "",
                  telefonePrincipal: "",
                  telefoneAlternativo: "",
                  tipoDeclaracaoId: "",
                  duracaoDeclaracaoId: "",
                  efeitoDeclaracaoId: "",
                  outroEfeito: "",
                  comprovativoPagamento: comprovativo(),
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
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInput
                          id="email"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur("email")}
                          onChange={handleChange("email")}
                          className={errors.email ? "input-error" : "none"}
                          autoComplete="email"
                        />
                        {errors.email ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.email}
                          </div>
                        ) : null}
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
                          Selecciona seu grau acadêmico
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
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="tipoDeclaracaoId">
                          Selecciona o tipo de declaração
                        </CLabel>
                        <CSelect
                          id="tipoDeclaracaoId"
                          name="tipoDeclaracaoId"
                          value={values.tipoDeclaracaoId}
                          onBlur={handleBlur("tipoDeclaracaoId")}
                          onChange={handleChange("tipoDeclaracaoId")}
                          className={
                            errors.tipoDeclaracaoId ? "input-error" : "none"
                          }
                          autoComplete="tipoDeclaracaoId"
                        >
                          <option value="0">
                            Por favor, seleccione o tipo
                          </option>
                          {tipo.map((item: any) => {
                            return <option value={item.id}>{item.tipo}</option>;
                          })}
                        </CSelect>
                        {errors.tipoDeclaracaoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.tipoDeclaracaoId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="duracaoDeclaracaoId">
                          Selecciona a duração da declaração
                        </CLabel>
                        <CSelect
                          id="duracaoDeclaracaoId"
                          name="duracaoDeclaracaoId"
                          value={values.duracaoDeclaracaoId}
                          onBlur={handleBlur("duracaoDeclaracaoId")}
                          onChange={handleChange("duracaoDeclaracaoId")}
                          className={
                            errors.duracaoDeclaracaoId ? "input-error" : "none"
                          }
                          autoComplete="duracaoDeclaracaoId"
                        >
                          <option value="0">
                            Por favor, seleccione uma duração
                          </option>
                          {duracao.map((item: any) => {
                            return (
                              <option value={item.id}>{item.duracao}</option>
                            );
                          })}
                        </CSelect>
                        {errors.duracaoDeclaracaoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.duracaoDeclaracaoId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="duracaoDeclaracaoId">
                          Selecciona o efeito da declaração
                        </CLabel>
                        <CSelect
                          id="efeitoDeclaracaoId"
                          name="efeitoDeclaracaoId"
                          value={values.efeitoDeclaracaoId}
                          onBlur={handleBlur("efeitoDeclaracaoId")}
                          onChange={handleChange("efeitoDeclaracaoId")}
                          className={
                            errors.efeitoDeclaracaoId ? "input-error" : "none"
                          }
                          autoComplete="efeitoDeclaracaoId"
                        >
                          <option value="0">
                            Por favor, seleccione um efeito
                          </option>
                          {efeito.map((item: any) => {
                            return (
                              <option value={item.id}>{item.efeito}</option>
                            );
                          })}
                        </CSelect>
                        {errors.efeitoDeclaracaoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.efeitoDeclaracaoId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="outroEfeito">Outro efeito</CLabel>
                        <CInput
                          id="outroEfeito"
                          name="outroEfeito"
                          value={values.outroEfeito}
                          onBlur={handleBlur("outroEfeito")}
                          onChange={handleChange("outroEfeito")}
                          className={
                            errors.outroEfeito ? "input-error" : "none"
                          }
                          autoComplete="outroEfeito"
                        />
                        {errors.outroEfeito ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.outroEfeito}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="telefonePrincipal">
                          Telefone Principal
                        </CLabel>
                        <CInput
                          type="tel"
                          id="telefonePrincipal"
                          name="telefonePrincipal"
                          value={values.telefonePrincipal}
                          onBlur={handleBlur("telefonePrincipal")}
                          onChange={handleChange("telefonePrincipal")}
                          className={
                            errors.telefonePrincipal ? "input-error" : "none"
                          }
                          autoComplete="telefonePrincipal"
                        />
                        {errors.telefonePrincipal ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.telefonePrincipal}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="telefoneAlternativo">
                          Telefone Alternativo
                        </CLabel>
                        <CInput
                          type="tel"
                          id="telefoneAlternativo"
                          name="telefoneAlternativo"
                          value={values.telefoneAlternativo}
                          onBlur={handleBlur("telefoneAlternativo")}
                          onChange={handleChange("telefoneAlternativo")}
                          className={
                            errors.telefoneAlternativo ? "input-error" : "none"
                          }
                          autoComplete="telefoneAlternativo"
                        />
                        {errors.telefoneAlternativo ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.telefoneAlternativo}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup>
                      <br />
                      <h6>Comprovativo de pagamento (pdf/img)</h6>
                      <UploadComprovativo />

                      <br />
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

export default AddDeclaracao;
