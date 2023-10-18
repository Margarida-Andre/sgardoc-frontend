import React, { useState } from "react";
import { NewAccountData, NewAccountProps } from "../type";
import { NewAccountForm } from "../validations";
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
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";

const FormsAddUser: React.FC<NewAccountProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { createUser } = useUser();

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

  async function handleCreateNewUser({
    DS_NOME,
    DS_EMAIL,
    DS_SENHA,
    DS_SENHA_CONFIRMACAO,
    DS_TELEFONE,
    DS_CPF,
    DS_CEP,
    DS_ENDERECO,
    DS_COMPLEMENTO,
    DS_CAMINHO_FOTO,
    CD_ACEITA_MALA_DIRETA,
    CD_ONLINE,
    CD_STATUS,
    DT_ULTIMO_ACESSO,
    CD_FORMA_PAGAMENTO,
    DS_TITULAR_CARTAO,
    DS_CPF_CARTAO,
    DS_VALIDADE,
    DS_NUMERO_CARTAO,
    DS_CODIGO_VERIFICACAO,
  }: NewAccountData) {
    try {
      await createUser({
        DS_NOME,
        DS_EMAIL,
        DS_SENHA,
        DS_SENHA_CONFIRMACAO,
        DS_TELEFONE,
        DS_CPF,
        DS_CEP,
        DS_ENDERECO,
        DS_COMPLEMENTO,
        DS_CAMINHO_FOTO: imgUrl1,
        CD_ACEITA_MALA_DIRETA,
        CD_ONLINE,
        CD_STATUS,
        DT_ULTIMO_ACESSO,
        CD_FORMA_PAGAMENTO,
        DS_TITULAR_CARTAO,
        DS_CPF_CARTAO,
        DS_VALIDADE,
        DS_NUMERO_CARTAO,
        DS_CODIGO_VERIFICACAO,
      });
      history.push("/users/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, preencha todos os campos", "error");
      console.log(error.message);
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
                Faça aqui o cadastro do usuário
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
                    DS_NOME: "",
                    DS_EMAIL: "",
                    DS_SENHA: "",
                    DS_TELEFONE: "",
                    DS_CPF: "",
                    DS_CEP: "",
                    DS_ENDERECO: "",
                    DS_COMPLEMENTO: "",
                    DS_CAMINHO_FOTO: "",
                    CD_ACEITA_MALA_DIRETA: "",
                    DS_SENHA_CONFIRMACAO: "",
                    CD_ONLINE: "1",
                    CD_STATUS: "1",
                    DT_ULTIMO_ACESSO: "",
                    CD_FORMA_PAGAMENTO: "0",
                    DS_TITULAR_CARTAO: "",
                    DS_CPF_CARTAO: "",
                    DS_VALIDADE: "",
                    DS_NUMERO_CARTAO: "",
                    DS_CODIGO_VERIFICACAO: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={NewAccountForm}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    errors,
                    touched,
                  }) => (
                    <>
                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_NOME">Nome</CLabel>
                          <CInput
                            id="DS_NOME"
                            name="DS_NOME"
                            value={values.DS_NOME}
                            onBlur={handleBlur("DS_NOME")}
                            onChange={handleChange("DS_NOME")}
                            className={
                              touched.DS_NOME && errors.DS_NOME
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="name"
                          />
                          {touched.DS_NOME && errors.DS_NOME ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_NOME}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="email">Email</CLabel>
                          <CInput
                            id="email"
                            name="email"
                            type="email"
                            value={values.DS_EMAIL}
                            onBlur={handleBlur("DS_EMAIL")}
                            onChange={handleChange("DS_EMAIL")}
                            className={
                              touched.DS_EMAIL && errors.DS_EMAIL
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_EMAIL"
                          />
                          {touched.DS_EMAIL && errors.DS_EMAIL ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_EMAIL}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="cpf">CPF</CLabel>
                          <CInput
                            id="DS_CPF"
                            name="DS_CPF"
                            value={values.DS_CPF}
                            onBlur={handleBlur("DS_CPF")}
                            onChange={handleChange("DS_CPF")}
                            className={
                              touched.DS_CPF && errors.DS_CPF
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="cpf"
                          />
                          {touched.DS_CPF && errors.DS_CPF ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_CPF}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_CEP">CEP</CLabel>
                          <CInput
                            id="DS_CEP"
                            name="DS_CEP"
                            value={values.DS_CEP}
                            onBlur={handleBlur("DS_CEP")}
                            onChange={handleChange("DS_CEP")}
                            className={
                              touched.DS_CEP && errors.DS_CEP
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_CEP"
                          />
                          {touched.DS_CEP && errors.DS_CEP ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_CEP}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="endereco">Endereço</CLabel>
                          <CInput
                            id="DS_ENDERECO"
                            name="DS_ENDERECO"
                            value={values.DS_ENDERECO}
                            onBlur={handleBlur("DS_ENDERECO")}
                            onChange={handleChange("DS_ENDERECO")}
                            className={
                              touched.DS_ENDERECO && errors.DS_ENDERECO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_ENDERECO"
                          />
                          {touched.DS_ENDERECO && errors.DS_ENDERECO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_ENDERECO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_COMPLEMENTO">Complemento</CLabel>
                          <CInput
                            id="DS_COMPLEMENTO"
                            name="DS_COMPLEMENTO"
                            value={values.DS_COMPLEMENTO}
                            onBlur={handleBlur("DS_COMPLEMENTO")}
                            onChange={handleChange("DS_COMPLEMENTO")}
                            className={
                              touched.DS_COMPLEMENTO && errors.DS_COMPLEMENTO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_COMPLEMENTO"
                          />
                          {touched.DS_COMPLEMENTO && errors.DS_COMPLEMENTO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_COMPLEMENTO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_TELEFONE">Telefone</CLabel>
                          <CInput
                            id="DS_TELEFONE"
                            name="DS_TELEFONE"
                            value={values.DS_TELEFONE}
                            onBlur={handleBlur("DS_TELEFONE")}
                            onChange={handleChange("DS_TELEFONE")}
                            className={
                              touched.DS_TELEFONE && errors.DS_TELEFONE
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="telefone"
                          />
                          {touched.DS_TELEFONE && errors.DS_TELEFONE ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_TELEFONE}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol md="6">
                          <CLabel htmlFor="mala">
                            Deseja receber actualizações?
                          </CLabel>
                          <CSelect
                            id="mala"
                            name="mala"
                            value={values.CD_ACEITA_MALA_DIRETA}
                            onBlur={handleBlur("CD_ACEITA_MALA_DIRETA")}
                            onChange={handleChange("CD_ACEITA_MALA_DIRETA")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_SENHA">Senha</CLabel>
                          <CInput
                            id="DS_SENHA"
                            type="DS_SENHA"
                            name="DS_SENHA"
                            value={values.DS_SENHA}
                            onBlur={handleBlur("DS_SENHA")}
                            onChange={handleChange("DS_SENHA")}
                            className={
                              touched.DS_SENHA && errors.DS_SENHA
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="current-password"
                          />
                          {touched.DS_SENHA && errors.DS_SENHA ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_SENHA}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="passwordConfirmation">
                            Confirmação de Senha
                          </CLabel>
                          <CInput
                            id="DS_SENHA_CONFIRMACAO"
                            type="DS_SENHA_CONFIRMACAO"
                            name="DS_SENHA_CONFIRMACAO"
                            value={values.DS_SENHA_CONFIRMACAO}
                            onBlur={handleBlur("DS_SENHA_CONFIRMACAO")}
                            onChange={handleChange("DS_SENHA_CONFIRMACAO")}
                            className={
                              touched.DS_SENHA_CONFIRMACAO &&
                              errors.DS_SENHA_CONFIRMACAO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_SENHA_CONFIRMACAO"
                          />
                          {touched.DS_SENHA_CONFIRMACAO &&
                          errors.DS_SENHA_CONFIRMACAO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_SENHA_CONFIRMACAO}
                            </div>
                          ) : null}
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
                                  src={imgUrl1 ? imgUrl1 : UploadImg}
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
                        onClick={() => handleCreateNewUser(values)}
                      >
                        <CIcon name="cil-scrubber" /> Cadastrar
                      </CButton>
                    </>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default FormsAddUser;
