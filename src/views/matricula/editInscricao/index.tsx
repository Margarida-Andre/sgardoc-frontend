import React, { FormEvent, useEffect, useState } from "react";
import { InscricaoData } from "../type";
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
import { useInscricao } from "../../../hooks/useInscricao";
import { useHistory } from "react-router-dom";
import { useMunicipio } from "../../../hooks/useMunicipio";
import { useProvincia } from "../../../hooks/useProvincia";
import { useEstadoCivil } from "../../../hooks/useEstadoCivil";
import { useGenero } from "../../../hooks/useGenero";
import { useCurso } from "../../../hooks/useCurso";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { UploadBi } from "../upload/upload-bi";
import { UploadCertificado } from "../upload/upload-certificado";
import { UploadFotografia } from "../upload/upload-fotografia";
import { UploadComprovativo } from "../upload/upload-comprovativo";

const EditInscricao: React.FC<InscricaoData> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { updateInscricao } = useInscricao();
  const { provincia } = useProvincia();
  const { municipio } = useMunicipio();
  const { estadoCivil } = useEstadoCivil();
  const { genero } = useGenero();
  const { curso } = useCurso();

  const [provinciaId, setProvinciaId] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [estadoCivilId, setEstadoCivilId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [opcao1CursoId, setOpcao1CursoId] = useState("");
  const [opcao2CursoId, setOpcao2CursoId] = useState("");
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
  const [comprovativoPagamento, setComprovativoPagamento] = useState("");
  const [telefonePrincipal, setTelefonePrincipal] = useState("");
  const [telefoneAlternativo, setTelefoneAlternativo] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");

  function adicionaZero(numero: any) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  useEffect(() => {
    async function getInscricao() {
      const id = localStorage.getItem("data-inscricao");
      await api
        .get(`/inscricao/${id}`)
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
          setProvinciaId(result.provinciaId);
          setMunicipioId(result.municipioId);
          setEstadoCivilId(result.estadoCivilId);
          setGeneroId(result.generoId);
          setOpcao1CursoId(result.opcao1CursoId);
          setOpcao2CursoId(result.opcao2CursoId);
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
          setComprovativoPagamento(result.comprovativoPagamento);
          setTelefonePrincipal(result.telefonePrincipal);
          setTelefoneAlternativo(result.telefoneAlternativo);
          setNomePai(result.nomePai);
          setNomeMae(result.nomeMae);
          console.log(result);
        });
    }
    getInscricao();
  }, []);

  async function handleUpdateInscricao(event: FormEvent) {
    event.preventDefault();
    try {
      await updateInscricao({
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        opcao1CursoId,
        opcao2CursoId,
        estadoId: 2,
        nome,
        email,
        dataNascimento,
        numeroBi,
        dataEmissaoBi,
        validadeBi,
        arquivoIdentificacao,
        carregamentoBi: carregamentoBi,
        certificadoEnsinoMedio: certificadoEnsinoMedio,
        carregamentoFotografia: carregamentoFotografia,
        comprovativoPagamento: comprovativoPagamento,
        telefonePrincipal,
        telefoneAlternativo,
        nomePai,
        nomeMae,
        criadoPor: localStorage.getItem("usuario-logado"),
        actualizadoPor: localStorage.getItem("usuario-logado"),
      });
      
      history.push("/inscricoes/aprovadas");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }

  function cancelEdit() {
    history.push("/inscricoes/aprovadas");
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
                Edita aqui as inscrições de exame de acesso
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
                <form onSubmit={handleUpdateInscricao}>
                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="provinciaId">Província</CLabel>
                      <CSelect
                        id="provinciaId"
                        name="provinciaId"
                        value={provinciaId}
                        onChange={(e) =>
                          setProvinciaId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">
                          Por favor, selecciona uma província
                        </option>
                        {provincia.map((item: any) => {
                          return (
                            <option value={item.id}>{item.designacao}</option>
                          );
                        })}
                      </CSelect>
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="municipioId">Município</CLabel>
                      <CSelect
                        id="municipioId"
                        name="municipioId"
                        value={municipioId}
                        onChange={(e) =>
                          setMunicipioId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">
                          Por favor, selecciona uma província
                        </option>
                        {municipio.map((item: any) => {
                          return (
                            <option value={item.id}>{item.designacao}</option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="nome">Nome</CLabel>
                      <CInput
                        id="nome"
                        name="nome"
                        autoComplete="nome"
                        value={nome}
                        onChange={(e) =>
                          setNome((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>

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
                        required
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="nomeMae">Nome da mãe</CLabel>
                      <CInput
                        id="nomeMae"
                        name="nomeMae"
                        autoComplete="nomeMae"
                        value={nomeMae}
                        onChange={(e) =>
                          setNomeMae((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="nomePai">Nome do pai</CLabel>
                      <CInput
                        id="nomePai"
                        name="nomePai"
                        autoComplete="nomePai"
                        value={nomePai}
                        onChange={(e) =>
                          setNomePai((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="estadoCivilId">
                        Selecciona o estado civil
                      </CLabel>
                      <CSelect
                        id="estadoCivilId"
                        name="estadoCivilId"
                        value={estadoCivilId}
                        onChange={(e) =>
                          setEstadoCivilId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">
                          Por favor, selecciona um estado civil
                        </option>
                        {estadoCivil.map((item: any) => {
                          return (
                            <option value={item.id}>{item.designacao}</option>
                          );
                        })}
                      </CSelect>
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="generoId">Selecciona o gênero</CLabel>
                      <CSelect
                        id="generoId"
                        name="generoId"
                        value={generoId}
                        onChange={(e) =>
                          setGeneroId((e.target as HTMLInputElement).value)
                        }
                      >
                        <option value="0">
                          Por favor, selecciona um gênero
                        </option>
                        {genero.map((item: any) => {
                          return (
                            <option value={item.id}>{item.designacao}</option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="telefonePrincipal">
                        Telefone principal
                      </CLabel>
                      <CInput
                        id="telefonePrincipal"
                        name="telefonePrincipal"
                        autoComplete="telefonePrincipal"
                        value={telefonePrincipal}
                        onChange={(e) =>
                          setTelefonePrincipal(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        required
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="telefoneAlternativo">
                        Telefone alternativo
                      </CLabel>
                      <CInput
                        id="telefoneAlternativo"
                        name="telefoneAlternativo"
                        autoComplete="telefoneAlternativo"
                        value={telefoneAlternativo}
                        onChange={(e) =>
                          setTelefoneAlternativo(
                            (e.target as HTMLInputElement).value
                          )
                        }
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="opcao1CursoId">Curso (opção 1)</CLabel>
                      <CSelect
                        id="opcao1CursoId"
                        name="opcao1CursoId"
                        value={opcao1CursoId}
                        onChange={(e) =>
                          setOpcao1CursoId((e.target as HTMLInputElement).value)
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

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="opcao2CursoId">Curso (opção 2)</CLabel>
                      <CSelect
                        id="opcao2CursoId"
                        name="opcao2CursoId"
                        value={opcao2CursoId}
                        onChange={(e) =>
                          setOpcao2CursoId((e.target as HTMLInputElement).value)
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

                  <CFormGroup>
                    <CCol xs="14" md="14">
                      <CLabel htmlFor="dataNascimento">
                        Data de Nacimento
                      </CLabel>
                      <CInput
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        autoComplete="dataNascimento"
                        value={dataNascimento}
                        onChange={(e) =>
                          setDataNascimento(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        required
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="numeroBi">Número do bilhete</CLabel>
                      <CInput
                        id="numeroBi"
                        name="numeroBi"
                        autoComplete="numeroBi"
                        value={numeroBi}
                        onChange={(e) =>
                          setNumeroBi((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="dataEmissaoBi">
                        Data de Emissão do BI
                      </CLabel>
                      <CInput
                        type="date"
                        id="dataEmissaoBi"
                        name="dataEmissaoBi"
                        autoComplete="dataEmissaoBi"
                        value={dataEmissaoBi}
                        onChange={(e) =>
                          setDataEmissaoBi((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CLabel htmlFor="validadeBi">Validade do BI</CLabel>
                      <CInput
                        type="date"
                        id="validadeBi"
                        name="validadeBi"
                        autoComplete="validadeBi"
                        value={validadeBi}
                        onChange={(e) =>
                          setValidadeBi((e.target as HTMLInputElement).value)
                        }
                        required
                      />
                    </CCol>

                    <CCol xs="12" md="6">
                      <CLabel htmlFor="arquivoIdentificacao">
                        Arquivo de identificação
                      </CLabel>
                      <CSelect
                        id="arquivoIdentificacao"
                        name="arquivoIdentificacao"
                        value={arquivoIdentificacao}
                        onChange={(e) =>
                          setArquivoIdentificacao(
                            (e.target as HTMLInputElement).value
                          )
                        }
                      >
                        <option value="0">
                          Por favor, selecciona um arquivo
                        </option>
                        {provincia.map((item: any) => {
                          return (
                            <option value={item.designacao}>
                              {item.designacao}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <br />
                  <h6>Carregamento do Bilhete de identidade (pdf/img)</h6>
                  <UploadBi />

                  <br />
                  <h6>Certificado do Ensino Médio (pdf/img)</h6>
                  <UploadCertificado />

                  <br />
                  <h6>Fotografia (img)</h6>
                  <UploadFotografia />

                  <br />
                  <h6>Comprovativo de pagamento (pdf/img)</h6>
                  <UploadComprovativo />

                  <br />
                  <div>
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

export default EditInscricao;
