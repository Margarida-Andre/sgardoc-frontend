import React, { FormEvent, useEffect, useState } from "react";
import { MatriculaData } from "../type";
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
import { useMatricula } from "../../../hooks/useMatricula";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { UploadComprovativo } from "../upload/upload-comprovativo";
import { CursoProps } from "src/views/inscricoes-exame-acesso/type";

const EditMatricula: React.FC<MatriculaData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { updateMatricula } = useMatricula();
  const [curso, setCurso] = useState<CursoProps[]>([]);

  const [provinciaId, setProvinciaId] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [estadoCivilId, setEstadoCivilId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numeroBi, setNumeroBi] = useState("");
  const [dataEmissaoBi, setDataEmissaoBi] = useState("");
  const [validadeBi, setValidadeBi] = useState("");
  const [arquivoIdentificacao, setArquivoIdentificacao] = useState("");
  const [carregamentoBi, setCarregamentoBi] = useState("");
  const [certificadoEnsinoMedio, setCertificadoEnsinoMedio] = useState("");
  const [carregamentoFotografia, setCarregamentoFotografia] = useState("");
  const [inscricaoExameAcessoId, setInscricaoExameAcessoId] = useState("");

  const comprovativo = () => {
    if (localStorage.getItem("firebase-comprovativo") === null) {
      return "vazio";
    } else {
      return localStorage.getItem("firebase-comprovativo");
    }
  };

  const [telefonePrincipal, setTelefonePrincipal] = useState("");
  const [telefoneAlternativo, setTelefoneAlternativo] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");

  function adicionaZero(numero: any) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  useEffect(() => {
    try {
      api.get("/cursoAll").then((response) => setCurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  useEffect(() => {
    async function getInscricao() {
      const id = localStorage.getItem("data-matricula");
      await api
        .get(`/matricula/${id}`)
        .then((response) => response.data)
        .then((result) => {
          let resultDataNascimento = new Date(result.dataNascimento);
          let resultDataEmissaoBI = new Date(result.dataEmissaoBi);
          let resultValidadeBI = new Date(result.validadeBi);
          let dataFormatadaNascimento =
            resultDataNascimento.getFullYear() +
            "-" +
            adicionaZero(resultDataNascimento.getMonth() + 1).toString() +
            "-" +
            adicionaZero(resultDataNascimento.getDate().toString());

          let dataFormatadaEmissao =
            resultDataEmissaoBI.getFullYear() +
            "-" +
            adicionaZero(resultDataEmissaoBI.getMonth() + 1).toString() +
            "-" +
            adicionaZero(resultDataEmissaoBI.getDate().toString());

          let dataFormatadaValidade =
            resultValidadeBI.getFullYear() +
            "-" +
            adicionaZero(resultValidadeBI.getMonth() + 1).toString() +
            "-" +
            adicionaZero(resultValidadeBI.getDate().toString());
          setInscricaoExameAcessoId(result.inscricaoExameAcessoId);
          setProvinciaId(result.provinciaId);
          setMunicipioId(result.municipioId);
          setEstadoCivilId(result.estadoCivilId);
          setGeneroId(result.generoId);
          setNome(result.nome);
          setEmail(result.email);
          setDataNascimento(dataFormatadaNascimento);
          setNumeroBi(result.numeroBi);
          setDataEmissaoBi(dataFormatadaEmissao);
          setValidadeBi(dataFormatadaValidade);
          setArquivoIdentificacao(result.arquivoIdentificacao);
          setCarregamentoBi(result.carregamentoBi);
          setCertificadoEnsinoMedio(result.certificadoEnsinoMedio);
          setCarregamentoFotografia(result.carregamentoFotografia);
          //  setComprovativoPagamento(result.comprovativoPagamento);
          setTelefonePrincipal(result.telefonePrincipal);
          setTelefoneAlternativo(result.telefoneAlternativo);
          setNomePai(result.nomePai);
          setNomeMae(result.nomeMae);
          console.log(result);
        });
    }
    getInscricao();
  }, []);

  async function handleEditMatricula(event: FormEvent) {
    event.preventDefault();
    try {
      await updateMatricula({
        inscricaoExameAcessoId: inscricaoExameAcessoId,
        provinciaId: provinciaId,
        municipioId: municipioId,
        estadoCivilId: estadoCivilId,
        generoId: generoId,
        cursoId,
        estadoId: 2,
        nome: nome,
        email: email,
        dataNascimento: dataNascimento,
        numeroBi: numeroBi,
        dataEmissaoBi: dataEmissaoBi,
        validadeBi: validadeBi,
        arquivoIdentificacao: arquivoIdentificacao,
        carregamentoBi: carregamentoBi,
        certificadoEnsinoMedio: certificadoEnsinoMedio,
        carregamentoFotografia: carregamentoFotografia,
        comprovativoPagamento: comprovativo(),
        telefonePrincipal: telefonePrincipal,
        telefoneAlternativo: telefoneAlternativo,
        nomePai: nomePai,
        nomeMae: nomeMae,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      Swal.fire("Editado (a)!", "Matrícula editada com sucesso", "success");
      history.push("/matriculas/aprovadas");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/matriculas/aprovadas");
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
                Edita aqui as matrículas
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
                <form onSubmit={handleEditMatricula}>
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
                    <CCol xs="12" md="14">
                      <CLabel htmlFor="cursoId">Curso</CLabel>
                      <CSelect
                        id="cursoId"
                        name="cursoId"
                        value={cursoId}
                        onChange={(e) =>
                          setCursoId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">Por favor, selecciona o curso</option>
                        {curso.map((item: any) => {
                          return (
                            <option value={item.id}>{item.designacao}</option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <br />
                  <h6>Comprovativo de pagamento (pdf/img)</h6>
                  <UploadComprovativo />

                  <br />
                  <div>
                    <CButton type="submit" size="sm" color="info">
                      <CIcon name="cil-scrubber" /> Editar Matricula
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
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default EditMatricula;
