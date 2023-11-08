import React, { FormEvent, useEffect, useState } from "react";
import { DisciplinaData, DisciplinaProps } from "../type";
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

const EditDisciplina: React.FC<DisciplinaData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const [designacao, setDesignacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState<DisciplinaProps[]>([]);
  const [grauAcademico, setGrauAcademico] = useState([]);
  const [curso, setCurso] = useState([]);
  const [cursoId, setCursoId] = useState("");
  const [semestre, setSemestre] = useState([]);
  const [grauAcademicoId, setGrauAcademicoId] = useState("");
  const [semestreId, setSemestreId] = useState("");

  useEffect(() => {
    async function getDisciplina() {
      const id = localStorage.getItem("code-curso");
      await api
        .get(`/disciplina/${id}`)
        .then((response) => response.data)
        .then((result) => {
          setDesignacao(result.designacao);
          setDescricao(result.descricao);
          setGrauAcademicoId(result.grauAcademicoId);
          setSemestreId(result.semestreId);
          console.log(result);
        });
    }
    getDisciplina();
  }, []);

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

  async function handleUpdateCurso(event: FormEvent) {
    event.preventDefault();
    try {
      const id = localStorage.getItem("code-disciplina");
      const result = await api.patch(`/disciplinaUpdate/${id}`, {
        designacao,
        descricao,
        semestreId,
        grauAcademicoId,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Editada!", "Disciplina editado com sucesso", "success");
      setDisciplina([...disciplina, result.data]);
      history.push("/disciplina/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/disciplina/list");
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
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="cursoId">Selecciona seu curso</CLabel>
                      <CSelect
                        id="cursoId"
                        name="cursoId"
                        value={cursoId}
                        onChange={(e) => {
                          setCursoId((e.target as HTMLInputElement).value);
                          onSelectCurso((e.target as HTMLSelectElement).value);
                        }}
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
                        Selecciona seu grau acadêmico
                      </CLabel>
                      <CSelect
                        id="grauAcademicoId"
                        name="grauAcademicoId"
                        value={grauAcademicoId}
                        onChange={(e) =>
                          setGrauAcademicoId(
                            (e.target as HTMLInputElement).value
                          )
                        }
                      >
                        <option value="0">Por favor, selecciona um grau</option>
                        {grauAcademico.map((item: any) => {
                          return (
                            <option value={item.id}>{item.descricao}</option>
                          );
                        })}
                      </CSelect>
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
                        value={semestreId}
                        onChange={(e) =>
                          setSemestreId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">
                          Por favor, selecciona um semestre
                        </option>
                        {semestre.map((item: any) => {
                          return (
                            <option value={item.id}>
                              {item.designacao + "º"}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="designacao">Designacao</CLabel>
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

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="descricao">Descrição</CLabel>
                      <CInput
                        id="descricao"
                        name="descricao"
                        value={descricao}
                        onChange={(e) =>
                          setDescricao((e.target as HTMLInputElement).value)
                        }
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

export default EditDisciplina;
