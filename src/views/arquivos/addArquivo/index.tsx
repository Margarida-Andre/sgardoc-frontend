import React, { useState } from "react";
import { ArquivosData, ArquivosProps } from "../type";
import { ArquivoForm } from "../validations";
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
  CLabel,
  CRow,
  CProgress,
  CTextarea,
  CSelect,
  CImg,
} from "@coreui/react";
import { CInputGroup, CInputGroupText, CFormInput } from "@coreui/react-pro";
import { useHistory } from "react-router-dom";
import { useArquivo } from "../../../hooks/useArquivo";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const AddArquivo: React.FC<ArquivosProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const [imgUrl1, setImgUrl1] = useState("");
  const [file1, setFile1] = useState([]);
  const [percent1, setPercent1] = useState(0);

  const [imgUrl2, setImgUrl2] = useState("");
  const [file2, setFile2] = useState([]);
  const [percent2, setPercent2] = useState(0);

  const history = useHistory();
  const { createArquivo } = useArquivo();
  async function handleCreateNewArquivo({
    DS_RESUMO,
    DS_ARQUIVO,
    DS_DESCRICAO,
    CD_TIPO,
    DS_LINK_THUMBNAIL,
    DS_TEXTO_THUMBNAIL,
    DS_LINK_ARQUIVO,
    DS_TEXTO_LINK,
  }: ArquivosData) {
    try {
      await createArquivo({
        DS_RESUMO,
        DS_ARQUIVO,
        DS_DESCRICAO,
        CD_TIPO,
        DS_LINK_THUMBNAIL: imgUrl1,
        DS_TEXTO_THUMBNAIL,
        DS_LINK_ARQUIVO: imgUrl2,
        DS_TEXTO_LINK,
      });
      history.push("/arquivo/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, preencha todos os campos", "error");
      console.log(error.message);
    }
  }

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

  const handleUpload2 = () => {
    if (!file2) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file2}`);

    const uploadTask = uploadBytesResumable(storageRef, file2[0]);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent2(percent);
      },
      (err: any) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setImgUrl2(url);
          console.log(imgUrl2);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file1}`);
    const uploadTask = uploadBytesResumable(storageRef, file1[0]);
    uploadTask.cancel();
  };

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
                Faça aqui o cadastro dos arquivos
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
                    DS_ARQUIVO: "",
                    DS_RESUMO: "",
                    DS_DESCRICAO: "",
                    CD_TIPO: "",
                    DS_LINK_THUMBNAIL: "",
                    DS_TEXTO_THUMBNAIL: "",
                    DS_LINK_ARQUIVO: "",
                    DS_TEXTO_LINK: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={ArquivoForm}
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
                          <CLabel htmlFor="ID_CURSO">Nome do arquivo</CLabel>
                          <CInput
                            id="DS_ARQUIVO"
                            name="DS_ARQUIVO"
                            value={values.DS_ARQUIVO}
                            onBlur={handleBlur("DS_ARQUIVO")}
                            onChange={handleChange("DS_ARQUIVO")}
                            className={
                              touched.DS_ARQUIVO && errors.DS_ARQUIVO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_ARQUIVO"
                          />
                          {touched.DS_ARQUIVO && errors.DS_ARQUIVO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_ARQUIVO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="descricao">Descrição</CLabel>
                          <CInput
                            id="descricao"
                            name="descricao"
                            value={values.DS_DESCRICAO}
                            onBlur={handleBlur("DS_DESCRICAO")}
                            onChange={handleChange("DS_DESCRICAO")}
                            className={
                              touched.DS_DESCRICAO && errors.DS_DESCRICAO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_DESCRICAO_DETALHADA"
                          />
                          {touched.DS_DESCRICAO && errors.DS_DESCRICAO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_DESCRICAO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="resumo">Resumo</CLabel>
                          <CTextarea
                            id="resumo"
                            name="resumo"
                            value={values.DS_RESUMO}
                            onBlur={handleBlur("DS_RESUMO")}
                            onChange={handleChange("DS_RESUMO")}
                            className={
                              touched.DS_RESUMO && errors.DS_RESUMO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_RESUMO"
                          />
                          {touched.DS_RESUMO && errors.DS_RESUMO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_RESUMO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="CD_TIPO">
                            Selecciona o tipo de arquivo
                          </CLabel>
                          <CSelect
                            id="CD_TIPO"
                            name="CD_TIPO"
                            value={values.CD_TIPO}
                            onBlur={handleBlur("CD_TIPO")}
                            onChange={handleChange("CD_TIPO")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Image</option>

                            <option value="1">Vídeo</option>
                          </CSelect>

                          {touched.CD_TIPO && errors.CD_TIPO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.CD_TIPO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>
                      <br />
                      <h6>Upload fundo do arquivo(img)</h6>
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <div
                            style={{
                              border: "1px dotted dodgerblue",
                              padding: "1rem",
                            }}
                          >
                            <CLabel htmlFor="DS_TEXTO_THUMBNAIL">
                              Descrição fundo do arquivo
                            </CLabel>
                            <CInput
                              id="DS_TEXTO_THUMBNAIL"
                              name="DS_TEXTO_THUMBNAIL"
                              value={values.DS_TEXTO_THUMBNAIL}
                              onBlur={handleBlur("DS_TEXTO_THUMBNAIL")}
                              onChange={handleChange("DS_TEXTO_THUMBNAIL")}
                              className={
                                touched.DS_TEXTO_THUMBNAIL &&
                                errors.DS_TEXTO_THUMBNAIL
                                  ? "input-error"
                                  : "none"
                              }
                              autoComplete="DS_TEXTO_THUMBNAIL"
                            />
                            {touched.DS_TEXTO_THUMBNAIL &&
                            errors.DS_TEXTO_THUMBNAIL ? (
                              <div className="errors">
                                <span className="icon">
                                  <MdOutlineError />
                                </span>
                                {errors.DS_TEXTO_THUMBNAIL}
                              </div>
                            ) : null}

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
                                id="DS_LINK_THUMBNAIL"
                                name="DS_LINK_THUMBNAIL"
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
                      <h6>Upload arquivo (pdf/vídeo/img)</h6>
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <div
                            style={{
                              border: "1px dotted dodgerblue",
                              padding: "1rem",
                            }}
                          >
                            <CLabel htmlFor="DS_TEXTO_LINK">
                              Descrição do arquivo
                            </CLabel>
                            <CInput
                              id="DS_TEXTO_LINK"
                              name="DS_TEXTO_LINK"
                              value={values.DS_TEXTO_LINK}
                              onBlur={handleBlur("DS_TEXTO_LINK")}
                              onChange={handleChange("DS_TEXTO_LINK")}
                              className={
                                touched.DS_TEXTO_LINK && errors.DS_TEXTO_LINK
                                  ? "input-error"
                                  : "none"
                              }
                              autoComplete="DS_TEXTO_LINK"
                            />
                            {touched.DS_TEXTO_LINK && errors.DS_TEXTO_LINK ? (
                              <div className="errors">
                                <span className="icon">
                                  <MdOutlineError />
                                </span>
                                {errors.DS_TEXTO_LINK}
                              </div>
                            ) : null}
                            <div className="upload">
                              <div className="image">
                                <CImg
                                  src={imgUrl2 ? imgUrl2 : UploadImg}
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
                                id="DS_LINK_ARQUIVO"
                                name="DS_LINK_ARQUIVO"
                                onChange={(e: any) => setFile2(e.target.files)}
                              />
                              <CCol
                                md
                                sm="12"
                                className="mb-sm-2 mb-0 d-md-down-none"
                              >
                                <strong>{percent2}%</strong>
                                <CProgress
                                  className="progress-xs mt-2"
                                  precision={1}
                                  color="info"
                                  value={percent2}
                                />
                              </CCol>

                              <CButton
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={handleUpload2}
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
                            Or
                            <div className="upload">
                              <div className="image">
                                <source src={imgUrl2 ? imgUrl2 : UploadImg} />
                                <CImg
                                  src={imgUrl2 ? imgUrl2 : UploadImg}
                                  alt="mundo-nathy"
                                  fluid
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </div>

                              <CInputGroup
                                className="mb-3"
                                style={{ marginLeft: "1rem" }}
                              >
                                <CInputGroupText id="basic-addon3">
                                  https://www.youtube.com/
                                </CInputGroupText>
                                <CFormInput
                                  id="basic-url"
                                  aria-describedby="basic-addon3"
                                  name="DS_LINK_ARQUIVO"
                                  value={imgUrl2}
                                  onChange={(e: any) =>
                                    setImgUrl2(e.target.value)
                                  }
                                />
                              </CInputGroup>
                            </div>
                          </div>
                        </CCol>
                      </CFormGroup>

                      <br />
                      <CButton
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={() => handleCreateNewArquivo(values)}
                      >
                        <CIcon name="cil-scrubber" /> Cadastrar Arquivo
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

export default AddArquivo;
