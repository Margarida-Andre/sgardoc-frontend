import React, { FormEvent, useEffect, useState } from "react";
import { NewAccountEditProps } from "../type";
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
  CImg,
  CProgress,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { useUser } from "src/hooks/useUsers";
import { useHistory } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import api from "src/services/api";

const FormsEditUser: React.FC<NewAccountEditProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { updateUser } = useUser();

  const [USUARIO_ALTERANDO, setUSUARIO_ALTERANDO] = useState("");
  const [USUARIO_ALTERADO, setUSUARIO_ALTERADO] = useState("");
  const [CD_STATUS, setCD_STATUS] = useState("");
  const [DS_NOME, setDS_NOME] = useState("");
  const [DS_TELEFONE, setDS_TELEFONE] = useState("");
  const [DS_CPF, setDS_CPF] = useState("");
  const [DS_CEP, setDS_CEP] = useState("");
  const [DS_ENDERECO, setDS_ENDERECO] = useState("");
  const [DS_COMPLEMENTO, setDS_COMPLEMENTO] = useState("");
  const [DS_CAMINHO_FOTO, setDS_CAMINHO_FOTO] = useState("");
  const [CD_ACEITA_MALA_DIRETA, setCD_ACEITA_MALA_DIRETA] = useState("");

  useEffect(() => {
    async function getUser() {
      const USUARIO_ALTERANDO = localStorage.getItem("data-user");
      await api
        .get(`/seguranca/usuario/${USUARIO_ALTERANDO}`)
        .then((response) => response.data)
        .then((result) => {
          setUSUARIO_ALTERANDO(result[0].ID_USUARIO);
          setUSUARIO_ALTERADO(result[0].ID_ALUNO);
          setDS_NOME(result[0].DS_NOME);
          setCD_STATUS(result[0].CD_STATUS);
          setDS_TELEFONE(result[0].DS_TELEFONE);
          setDS_CPF(result[0].DS_CPF);
          setDS_CEP(result[0].DS_CEP);
          setDS_ENDERECO(result[0].DS_ENDERECO);
          setDS_COMPLEMENTO(result[0].DS_COMPLEMENTO);
          setDS_CAMINHO_FOTO(result[0].DS_CAMINHO_FOTO);
          setCD_ACEITA_MALA_DIRETA(result[0].CD_ACEITA_MALA_DIRETA);

          console.log(result);
        });
    }
    getUser();
  }, []);

  const [imgUrl1, setImgUrl1] = useState("");
  const [file1, setFile1] = useState([]);
  const [percent1, setPercent1] = useState(0);

  const handleUpload1 = () => {
    if (!file1) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file1}`);

    const uploadTask = uploadBytesResumable(storageRef, file1[0]);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent1(percent);
      },
      (err: any) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setImgUrl1(url);
          console.log(imgUrl1);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file1}`);
    const uploadTask = uploadBytesResumable(storageRef, file1[0]);
    uploadTask.cancel();
  };

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();
    try {
      await updateUser({
        USUARIO_ALTERANDO,
        USUARIO_ALTERADO,
        DS_NOME,
        CD_ACEITA_MALA_DIRETA,
        CD_STATUS,
        DS_CPF,
        DS_CEP,
        DS_ENDERECO,
        DS_COMPLEMENTO,
        DS_TELEFONE,
        DS_CAMINHO_FOTO: imgUrl1,
      });
      history.push("/users/list");
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
                Edita aqui os usuários
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
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="USUARIO_ALTERANDO">Código</CLabel>
                    <CInput
                      id="USUARIO_ALTERANDO"
                      name="USUARIO_ALTERANDO"
                      autoComplete="USUARIO_ALTERANDO"
                      value={USUARIO_ALTERANDO}
                      onChange={(e) =>
                        setUSUARIO_ALTERANDO(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      required
                      disabled
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="USUARIO_ALTERADO">
                      Código do usuário
                    </CLabel>
                    <CInput
                      id="USUARIO_ALTERADO"
                      name="USUARIO_ALTERADO"
                      autoComplete="USUARIO_ALTERADO"
                      value={USUARIO_ALTERADO}
                      onChange={(e) =>
                        setUSUARIO_ALTERADO(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      required
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="DS_NOME">
                    <CLabel htmlFor="DS_NOME">Nome</CLabel>
                    <CInput
                      id="DS_NOME"
                      name="DS_NOME"
                      value={DS_NOME}
                      onChange={(e) =>
                        setDS_NOME((e.target as HTMLInputElement).value)
                      }
                      autoComplete="DS_NOME"
                      required
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_CPF">CPF</CLabel>
                    <CInput
                      id="DS_CPF"
                      name="DS_CPF"
                      value={DS_CPF}
                      onChange={(e) =>
                        setDS_CPF((e.target as HTMLInputElement).value)
                      }
                      required
                      autoComplete="DS_CPF"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_CEP">CEP</CLabel>
                    <CInput
                      id="DS_CEP"
                      name="DS_CEP"
                      value={DS_CEP}
                      onChange={(e) =>
                        setDS_CEP((e.target as HTMLInputElement).value)
                      }
                      required
                      autoComplete="DS_CEP"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_ENDERECO">Endereço</CLabel>
                    <CInput
                      id="DS_ENDERECO"
                      name="DS_ENDERECO"
                      value={DS_ENDERECO}
                      onChange={(e) =>
                        setDS_ENDERECO((e.target as HTMLInputElement).value)
                      }
                      required
                      autoComplete="DS_ENDERECO"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_COMPLEMENTO">Complemento</CLabel>
                    <CInput
                      id="DS_COMPLEMENTO"
                      name="DS_COMPLEMENTO"
                      value={DS_COMPLEMENTO}
                      onChange={(e) =>
                        setDS_COMPLEMENTO((e.target as HTMLInputElement).value)
                      }
                      required
                      autoComplete="DS_COMPLEMENTO"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_TELEFONE">Telefone</CLabel>
                    <CInput
                      id="DS_TELEFONE"
                      name="DS_TELEFONE"
                      value={DS_TELEFONE}
                      onChange={(e) =>
                        setDS_TELEFONE((e.target as HTMLInputElement).value)
                      }
                      required
                      autoComplete="telefone"
                    />
                  </CCol>

                  <CCol md="6">
                    <CLabel htmlFor="CD_ACEITA_MALA_DIRETA">
                      Deseja receber actualizações?
                    </CLabel>
                    <CSelect
                      id="CD_ACEITA_MALA_DIRETA"
                      name="CD_ACEITA_MALA_DIRETA"
                      value={CD_ACEITA_MALA_DIRETA}
                      onChange={(e) =>
                        setCD_ACEITA_MALA_DIRETA(
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Não</option>

                      <option value="1">Sim</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <br />
                <h6>Upload da foto (img)</h6>
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <div
                      style={{
                        border: "1px dotted dodgerblue",
                        padding: "1rem",
                      }}
                    >
                      <div className="upload">
                        <div className="image">
                          <CImg
                            src={imgUrl1 ? imgUrl1 : DS_CAMINHO_FOTO}
                            alt="mundo-nathy"
                            fluid
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <input
                          className="input-file"
                          type="file"
                          id="DS_CAMINHO_FOTO"
                          name="DS_CAMINHO_FOTO"
                          onChange={(e: any) => setFile1(e.target.files)}
                        />
                        <CCol
                          md
                          sm="12"
                          className="mb-sm-2 mb-0 d-md-down-none"
                        >
                          <strong>{percent1}%</strong>
                          <CProgress
                            className="progress-xs mt-2"
                            precision={1}
                            color="info"
                            value={percent1}
                          />
                        </CCol>

                        <CButton
                          type="submit"
                          size="sm"
                          color="info"
                          onClick={handleUpload1}
                        >
                          <CIcon name="cil-scrubber" /> Upload
                        </CButton>

                        <CButton
                          className="btn-upload"
                          type="submit"
                          size="sm"
                          color="info"
                          onClick={cancelUpload}
                        >
                          <CIcon name="cil-x" /> Cancelar
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                </CFormGroup>

                <br />
                <CButton
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={handleUpdateUser}
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

export default FormsEditUser;
