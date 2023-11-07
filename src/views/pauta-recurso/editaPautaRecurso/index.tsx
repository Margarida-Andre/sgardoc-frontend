import React, { FormEvent, useEffect, useState } from "react";
import { PautaData, PautaProps } from "../type";
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
import { override } from "../../../global";
import ScaleLoader from "react-spinners/ScaleLoader";

const EditPauta: React.FC<PautaData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const id = localStorage.getItem("code-pauta-recurso");
  const [notaRecurso, setNotaRecurso] = useState("");
  const [mediaFinal, setMediaFinal] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [estudanteId, setEstudanteId] = useState("");
  const [semestreId, setSemestreId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  let [loading, setLoading] = useState(false);
  const [pauta, setPauta] = useState<PautaProps[]>([]);

  useEffect(() => {
    async function getEstudante() {
      await api
        .get(`/pautaRecurso/${id}`)
        .then((response) => response.data)
        .then((result) => {
          setNotaRecurso(result.recurso);
          setMediaFinal(result.mediaFinal);
          setProfessorId(result.professorId);
          setEstudanteId(result.estudanteId);
          setSemestreId(result.semestreId);
          setDisciplinaId(result.disciplinaId);
          console.log(result);
        });
    }
    getEstudante();
  }, [id]);

  async function handleUpdatePauta(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await api.patch(`/pautaRecursoUpdate/${id}`, {
        notaRecurso,
        mediaFinal: parseFloat(notaRecurso),
        observacao:
          parseFloat(notaRecurso) > 9 ? "Aprovado(a)" : "Reprovado(a)",
        professorId,
        estudanteId,
        semestreId,
        disciplinaId,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      setLoading(false);
      Swal.fire("Pauta Recurso!", "Notas editadas com sucesso", "success");
      setPauta([...pauta, result.data]);
      history.push("/pautaRecurso/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/pautaRecurso/list");
  }

  return (
    <>
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
                  Edita aqui as informações da pauta de recurso
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
                  <form onSubmit={handleUpdatePauta}>
                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="notaRecurso">Nota Recurso</CLabel>
                        <CInput
                          type="number"
                          id="notaRecurso"
                          name="notaRecurso"
                          value={notaRecurso}
                          onChange={(e) => {
                            setNotaRecurso(
                              (e.target as HTMLInputElement).value
                            );
                          }}
                          autoComplete="notaRecurso"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="mediaFinal">Média final</CLabel>
                        <CInput
                          type="number"
                          id="mediaFinal"
                          name="mediaFinal"
                          value={parseFloat(notaRecurso)}
                          onChange={() => {
                            setMediaFinal(mediaFinal);
                          }}
                          autoComplete="mediaFinal"
                          disabled
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
        )}
      </CRow>
    </>
  );
};

export default EditPauta;
