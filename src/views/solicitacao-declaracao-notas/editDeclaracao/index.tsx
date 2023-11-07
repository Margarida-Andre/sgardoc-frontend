import React, { FormEvent, useEffect, useState } from "react";
import {
  DeclaracaoData,
  DeclaracaoProps,
  GrauProps,
  EfeitoProps,
  DuracaoProps,
  TipoProps,
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
import { UploadComprovativo } from "../upload/upload-comprovativo";

const EditDeclaracao: React.FC<DeclaracaoData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const [declaracao, setDeclaracao] = useState<DeclaracaoProps[]>([]);

  const [grauAcademicoId, setGrauAcademicoId] = useState("");
  const [grauAcademico, setGrauAcademico] = useState<GrauProps[]>([]);
  const [email, setEmail] = useState("");
  const [tipoDeclaracaoId, setTipoDeclaracaoId] = useState("");
  const [duracaoDeclaracaoId, setDuracaoDeclaracaoId] = useState("");
  const [efeitoDeclaracaoId, setEfeitoDeclaracaoId] = useState("");
  const [tipoDeclaracao, setTipoDeclaracao] = useState<TipoProps[]>([]);
  const [duracaoDeclaracao, setDuracaoDeclaracao] = useState<DuracaoProps[]>(
    []
  );
  const [efeitoDeclaracao, setEfeitoDeclaracao] = useState<EfeitoProps[]>([]);
  const [outroEfeito, setOutroEfeito] = useState("");
  const comprovativo = localStorage.getItem("firebase-comprovativo");
  const [telefonePrincipal, setTelefonePrincipal] = useState("");
  const [telefoneAlternativo, setTelefoneAlternativo] = useState("");

  useEffect(() => {
    try {
      api
        .get("/duracaoAll")
        .then((response) => setDuracaoDeclaracao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api
        .get("/EfeitoAll")
        .then((response) => setEfeitoDeclaracao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api
        .get("/grauAcademicoAll")
        .then((response) => setGrauAcademico(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      api.get("/tipoAll").then((response) => setTipoDeclaracao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);
  useEffect(() => {
    async function getDeclaracao() {
      const id = localStorage.getItem("code-declaracao");
      await api
        .get(`/declaracao/${id}`)
        .then((response) => response.data)
        .then((result) => {
          setGrauAcademicoId(result.grauAcademicoId);
          setEmail(result.email);
          setTelefonePrincipal(result.telefonePrincipal);
          setTelefoneAlternativo(result.telefoneAlternativo);
          setTipoDeclaracaoId(result.tipoDeclaracaoId);
          setDuracaoDeclaracaoId(result.duracaoDeclaracaoId);
          setEfeitoDeclaracaoId(result.efeitoDeclaracaoId);
          setOutroEfeito(result.outroEfeito);
          console.log(result);
        });
    }
    getDeclaracao();
  }, []);

  async function handleUpdateDeclaracacao(event: FormEvent) {
    event.preventDefault();
    try {
      const id = localStorage.getItem("data-declaracao");
      const result = await api.patch(`/declaracaoUpdate/${id}`, {
        estudanteId: localStorage.getItem("code-estudante"),
        grauAcademicoId,
        estadoId: 2,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        tipoDeclaracaoId,
        duracaoDeclaracaoId,
        efeitoDeclaracaoId,
        outroEfeito,
        comprovativoPagamento: comprovativo,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Editado!", "Inscrição editada com sucesso", "success");
      setDeclaracao([...declaracao, result.data]);
      history.push("/declaracao/aprovadas");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/declaracao/aprovadas");
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
                Edita aqui as declarações de estudos
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
                <form onSubmit={handleUpdateDeclaracacao}>
                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) =>
                          setEmail((e.target as HTMLInputElement).value)
                        }
                        autoComplete="email"
                      />
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
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="tipoDeclaracaoId">
                        Selecciona o tipo de declaração
                      </CLabel>
                      <CSelect
                        id="tipoDeclaracaoId"
                        name="tipoDeclaracaoId"
                        value={tipoDeclaracaoId}
                        onChange={(e) =>
                          setTipoDeclaracaoId(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="tipoDeclaracaoId"
                      >
                        <option value="0">Por favor, selecciona um tipo</option>
                        {tipoDeclaracao.map((item: any) => {
                          return <option value={item.id}>{item.tipo}</option>;
                        })}
                      </CSelect>
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="duracaoDeclaracaoId">
                        Selecciona a duração da declaração
                      </CLabel>
                      <CSelect
                        id="duracaoDeclaracaoId"
                        name="duracaoDeclaracaoId"
                        value={duracaoDeclaracaoId}
                        onChange={(e) =>
                          setDuracaoDeclaracaoId(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="duracaoDeclaracaoId"
                      >
                        <option value="0">
                          Por favor, seleccione uma duração
                        </option>
                        {duracaoDeclaracao.map((item: any) => {
                          return (
                            <option value={item.id}>{item.duracao}</option>
                          );
                        })}
                      </CSelect>
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
                        value={efeitoDeclaracaoId}
                        onChange={(e) =>
                          setEfeitoDeclaracaoId(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="efeitoDeclaracaoId"
                      >
                        <option value="0">
                          Por favor, seleccione um efeito
                        </option>
                        {efeitoDeclaracao.map((item: any) => {
                          return <option value={item.id}>{item.efeito}</option>;
                        })}
                      </CSelect>
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="outroEfeito">Outro efeito</CLabel>
                      <CInput
                        id="outroEfeito"
                        name="outroEfeito"
                        value={outroEfeito}
                        onChange={(e) =>
                          setOutroEfeito((e.target as HTMLInputElement).value)
                        }
                        autoComplete="outroEfeito"
                      />
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
                        value={telefonePrincipal}
                        onChange={(e) =>
                          setTelefonePrincipal(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="telefonePrincipal"
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="telefoneAlternativo">
                        Telefone Alternativo
                      </CLabel>
                      <CInput
                        type="tel"
                        id="telefoneAlternativo"
                        name="telefoneAlternativo"
                        value={telefoneAlternativo}
                        onChange={(e) =>
                          setTelefoneAlternativo(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        autoComplete="telefoneAlternativo"
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup>
                    <br />
                    <h6>Comprovativo de pagamento (pdf/img)</h6>
                    <UploadComprovativo />

                    <br />
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

export default EditDeclaracao;
