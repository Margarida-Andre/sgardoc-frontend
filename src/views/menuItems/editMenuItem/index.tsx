import React from "react";
import { MenuItemsProps } from "../type";
import { MenuItemsForm } from "../validations";
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
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";

const EditMenuItem: React.FC<MenuItemsProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader style={{ background: "#39f", color: "white" }}>
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
                    descricao: "",
                    link: "",
                    image: "",
                    ocultar: "",
                    alt: "",
                    permissao: "",
                    menu_pai: "",
                    ordenacao: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={MenuItemsForm}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    errors,
                    touched,
                  }) => (
                    <CForm className="form-horizontal">
                      <CFormGroup row>
                        <CCol xs="12" md="7">
                          <CLabel htmlFor="descricao">Descricao</CLabel>
                          <CInput
                            id="descricao"
                            name="descricao"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="7">
                          <CLabel htmlFor="name">Descricao</CLabel>
                          <CInput
                            id="name"
                            name="name"
                            value={values.descricao}
                            onBlur={handleBlur("descricao")}
                            onChange={handleChange("descricao")}
                            className={
                              touched.descricao && errors.descricao
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.descricao && errors.descricao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.descricao}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <br />
                      <CButton type="submit" size="sm" color="info">
                        <CIcon name="cil-scrubber" /> Cadastrar
                      </CButton>
                    </CForm>
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

export default EditMenuItem;
