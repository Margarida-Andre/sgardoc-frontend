import React, { FormEvent, useEffect, useState } from "react";
import { ArquivosProps } from "../type";
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
  CInputFile,
  CTextarea,
  CSelect,
} from "@coreui/react";
import api from "src/services/api";
import { useArquivo } from "src/hooks/useArquivo";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const EditArquivo: React.FC<ArquivosProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { updateArquivo } = useArquivo();

  const [ID_ARQUIVO, setID_ARQUIVO] = useState("");
  const [DS_ARQUIVO, setDS_ARQUIVO] = useState("");
  const [DS_RESUMO, setDS_RESUMO] = useState("");
  const [DS_DESCRICAO, setDS_DESCRICAO] = useState("");
  const [CD_TIPO, setCD_TIPO] = useState("0");
  const [DS_LINK_THUMBNAIL, setDS_LINK_THUMBNAIL] = useState("");
  const [DS_TEXTO_THUMBNAIL, setDS_TEXTO_THUMBNAIL] = useState("");
  const [DS_LINK_ARQUIVO, setDS_LINK_ARQUIVO] = useState("");
  const [DS_TEXTO_LINK, setDS_TEXTO_LINK] = useState("");

  useEffect(() => {
    async function getArquivo() {
      const ID_ARQUIVO = localStorage.getItem("data-arquivo");
      await api
        .get(`/produto/arquivo/${ID_ARQUIVO}`)
        .then((response) => response.data)
        .then((result) => {
          setID_ARQUIVO(result[0].ID_ARQUIVO);
          setDS_ARQUIVO(result[0].DS_ARQUIVO);
          setDS_RESUMO(result[0].DS_RESUMO);
          setDS_DESCRICAO(result[0].DS_DESCRICAO);
          setCD_TIPO(result[0].CD_TIPO);
          setDS_LINK_THUMBNAIL(result[0].DS_LINK_THUMBNAIL);
          setDS_TEXTO_THUMBNAIL(result[0].DS_TEXTO_THUMBNAIL);
          setDS_LINK_ARQUIVO(result[0].DS_LINK_ARQUIVO);
          setDS_TEXTO_LINK(result[0].DS_TEXTO_LINK);
          console.log(result);
        });
    }
    getArquivo();
  }, []);

  async function handleUpdateArquivo(event: FormEvent) {
    event.preventDefault();
    try {
      await updateArquivo({
        ID_ARQUIVO,
        DS_ARQUIVO,
        DS_RESUMO,
        DS_DESCRICAO,
        CD_TIPO,
        DS_LINK_THUMBNAIL,
        DS_TEXTO_THUMBNAIL,
        DS_LINK_ARQUIVO,
        DS_TEXTO_LINK,
      });
      history.push("/arquivo/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
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
                Edita aqui os arquivos
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
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <CLabel htmlFor="ID_ARQUIVO">Código</CLabel>
                    <CInput
                      id="ID_ARQUIVO"
                      name="ID_ARQUIVO"
                      autoComplete="ID_ARQUIVO"
                      value={ID_ARQUIVO}
                      onChange={(e) =>
                        setID_ARQUIVO((e.target as HTMLInputElement).value)
                      }
                      disabled
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_ARQUIVO">Nome do arquivo</CLabel>
                    <CInput
                      id="DS_ARQUIVO"
                      name="DS_ARQUIVO"
                      autoComplete="DS_ARQUIVO"
                      value={DS_ARQUIVO}
                      onChange={(e) =>
                        setDS_ARQUIVO((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_DESCRICAO">Descrição</CLabel>
                    <CInput
                      id="DS_DESCRICAO"
                      name="DS_DESCRICAO"
                      autoComplete="DS_ARQUIVO"
                      value={DS_DESCRICAO}
                      onChange={(e) =>
                        setDS_DESCRICAO((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="14">
                    <CLabel htmlFor="DS_RESUMO">Resumo</CLabel>
                    <CTextarea
                      id="DS_RESUMO"
                      name="DS_RESUMO"
                      autoComplete="DS_RESUMO"
                      value={DS_RESUMO}
                      onChange={(e) =>
                        setDS_RESUMO((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="14">
                    <CLabel htmlFor="CD_TIPO">Selecciona o tipo</CLabel>
                    <CSelect
                      id="CD_TIPO"
                      name="CD_TIPO"
                      value={CD_TIPO}
                      onChange={(e) =>
                        setCD_TIPO((e.target as HTMLInputElement).value)
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Image</option>

                      <option value="1">Vídeo</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_TEXTO_THUMBNAIL">
                      Descrição do Thumbnail
                    </CLabel>
                    <CInput
                      id="DS_TEXTO_THUMBNAIL"
                      name="DS_TEXTO_THUMBNAIL"
                      autoComplete="DS_TEXTO_THUMBNAIL"
                      value={DS_TEXTO_THUMBNAIL}
                      onChange={(e) =>
                        setDS_TEXTO_THUMBNAIL(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      required
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_LINK_THUMBNAIL">Thumbnail</CLabel>
                    <CInputFile
                      id="DS_LINK_THUMBNAIL"
                      name="DS_LINK_IMAGEM1"
                      autoComplete="DS_LINK_IMAGEM1"
                      onChange={(e) =>
                        setDS_LINK_THUMBNAIL(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_TEXTO_LINK">
                      Descrição do Arquivo
                    </CLabel>
                    <CInput
                      id="DS_TEXTO_LINK"
                      name="DS_TEXTO_LINK"
                      autoComplete="DS_TEXTO_LINK"
                      value={DS_TEXTO_LINK}
                      onChange={(e) =>
                        setDS_TEXTO_LINK((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_LINK_ARQUIVO">Arquivo</CLabel>
                    <CInputFile
                      id="DS_LINK_ARQUIVO"
                      name="DS_LINK_ARQUIVO"
                      autoComplete="DS_LINK_ARQUIVO"
                      onChange={(e) =>
                        setDS_LINK_ARQUIVO((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                  </CCol>
                </CFormGroup>

                <br />
                <CButton
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={handleUpdateArquivo}
                >
                  <CIcon name="cil-scrubber" /> Editar
                </CButton>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default EditArquivo;
