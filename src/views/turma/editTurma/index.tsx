import React, { FormEvent, useEffect, useState } from "react";
import {
  CursoProps,
  TurmaData,
  GrauProps,
  TurmaProps,
  TurnoProps,
} from "../type";
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
  CSelect,
} from "@coreui/react";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const EditTurma: React.FC<TurmaData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const codeEstudante = localStorage.getItem("code-turma");

  const [grau, setGrau] = useState<GrauProps[]>([]);
  const [turma, setTurma] = useState<TurmaProps[]>([]);
  const [turno, setTurno] = useState<TurnoProps[]>([]);
  const [curso, setCurso] = useState<CursoProps[]>([]);
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [grauAcademicoId, setGrauAcademicoId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [turnoId, setTurnoId] = useState("");
  const [matriculaId, setMatriculaId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");

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
    async function getEstudante() {
      await api
        .get(`/estudante/${codeEstudante}`)
        .then((response) => response.data)
        .then((result) => {
          setMatriculaId(result.matriculaId);
          setUsuarioId(result.usuarioId);
          setCursoId(result.cursoId);
          setGrauAcademicoId(result.grauAcademicoId);
          setTurmaId(result.turmaId);
          setTurnoId(result.turnoId);
          setNumeroProcesso(result.numeroProcesso);
          setDescricao(result.descricao);
          console.log(result);
        });
    }
    getEstudante();
  }, [codeEstudante]);

  async function handleUpdateEstudante(event: FormEvent) {
    event.preventDefault();
    try {
      await api.patch(`/estudanteUpdate/${codeEstudante}`, {
        matriculaId: matriculaId,
        usuarioId: usuarioId,
        cursoId,
        grauAcademicoId,
        turmaId,
        turnoId,
        numeroProcesso,
        descricao,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Editado (a)!", "Estudante editado (a) com sucesso", "success");
      history.push("/estudantes/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/estudantes/list");
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
                Edita aqui as informações de um estudante
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
                <form onSubmit={handleUpdateEstudante}>
                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="cursoId">Selecciona um curso</CLabel>
                      <CSelect
                        id="cursoId"
                        name="cursoId"
                        value={cursoId}
                        onChange={(e) => {
                          setCursoId((e.target as HTMLInputElement).value);
                          onSelectCurso((e.target as HTMLSelectElement).value);
                        }}
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
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="grauAcademicoId">
                        Selecciona um grau acadêmico
                      </CLabel>
                      <CSelect
                        id="grauAcademicoId"
                        name="grauAcademicoId"
                        value={grauAcademicoId}
                        onChange={(e) => {
                          setGrauAcademicoId(
                            (e.target as HTMLInputElement).value
                          );
                          onSelectGrau((e.target as HTMLInputElement).value);
                        }}
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
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="turmaId">Selecciona uma turma</CLabel>
                      <CSelect
                        id="turmaId"
                        name="turmaId"
                        value={turmaId}
                        onChange={(e) => {
                          setTurmaId((e.target as HTMLInputElement).value);
                        }}
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
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor=" turnoId">Selecciona um turno</CLabel>
                      <CSelect
                        id=" turnoId"
                        name=" turnoId"
                        value={turnoId}
                        onChange={(e) => {
                          setTurnoId((e.target as HTMLInputElement).value);
                        }}
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
                        value={numeroProcesso}
                        onChange={(e) =>
                          setNumeroProcesso(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="numeroProcesso"
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="descricao">Descrição</CLabel>
                      <CInput
                        id="descricao"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => {
                          setDescricao((e.target as HTMLInputElement).value);
                        }}
                        autoComplete="descricao"
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

export default EditTurma;
