import React, { FormEvent, useEffect, useState } from "react";
import { PautaData } from "../type";
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

const EditPauta: React.FC<PautaData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const codePauta = localStorage.getItem("code-pauta-parcelar");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [mediaFinal, setMediaFinal] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [estudanteId, setEstudanteId] = useState("");
  const [semestreId, setSemestreId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");

  useEffect(() => {
    async function getEstudante() {
      await api
        .get(`/pautaParcelar/${codePauta}`)
        .then((response) => response.data)
        .then((result) => {
          setNota1(result.nota1);
          setNota2(result.nota2);
          setMediaFinal(result.mediaFinal);
          setProfessorId(result.professorId);
          setEstudanteId(result.estudanteId);
          setSemestreId(result.semestreId);
          setDisciplinaId(result.disciplinaId);

          console.log(result);
        });
    }
    getEstudante();
  }, [codePauta]);

  async function handleUpdatePauta(event: FormEvent) {
    event.preventDefault();
    try {
      await api.patch(`/estudanteUpdate/${codePauta}`, {
        nota1,
        nota2,
        mediaFinal,
        professorId,
        estudanteId,
        semestreId,
        disciplinaId,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Pauta!", "Notas editadas com sucesso", "success");
      history.push("/estudantes/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/pauta-parcelar/list");
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
                Edita aqui as informações da pauta parcelar
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
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="nota1">Primeira nota</CLabel>
                      <CInput
                        id="nota1"
                        name="nota1"
                        value={nota1}
                        onChange={(e) =>
                          setNota1((e.target as HTMLInputElement).value)
                        }
                        autoComplete="nota1"
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="nota2">Segunda nota</CLabel>
                      <CInput
                        id="nota2"
                        name="nota2"
                        value={nota2}
                        onChange={(e) => {
                          setNota2((e.target as HTMLInputElement).value);
                        }}
                        autoComplete="nota2"
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

export default EditPauta;
