import React, { useState } from "react";
import { MenuItemsProps } from "../type";
import { MenuItemsForm } from "../validations";
import CIcon from "@coreui/icons-react";
import { MdOutlineError } from "react-icons/md";
import { Permissions } from "../mocks";
import { MultiSelect } from "react-multi-select-component";
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
  CInputFile,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";

const AddMenuItem: React.FC<MenuItemsProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const [selected, setSelected] = useState([]);

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
                Faça aqui o cadastro dos itens do menu
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
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="descricao">Descrição</CLabel>
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
                            autoComplete="name"
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

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="link">Link</CLabel>
                          <CInput
                            id="link"
                            name="link"
                            value={values.link}
                            onBlur={handleBlur("link")}
                            onChange={handleChange("link")}
                            className={
                              touched.link && errors.link
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="link"
                          />
                          {touched.link && errors.link ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.link}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="alt">Hover da Imagem</CLabel>
                          <CInput
                            id="alt"
                            name="alt"
                            value={values.alt}
                            onBlur={handleBlur("alt")}
                            onChange={handleChange("alt")}
                            className={
                              touched.alt && errors.alt ? "input-error" : "none"
                            }
                            autoComplete="alt"
                          />
                          {touched.alt && errors.alt ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.alt}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="image">Carregar imagem</CLabel>
                          <CInputFile
                            type="file"
                            id="image"
                            name="image"
                            label="Default file input example"
                            value={values.image}
                            onBlur={handleBlur("photo")}
                            onChange={handleChange("photo")}
                            className={
                              touched.image && errors.image
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.image && errors.image ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.image}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="alt">Ordenação</CLabel>
                          <CInput
                            id="ordenacao"
                            name="ordenacao"
                            value={values.ordenacao}
                            onBlur={handleBlur("ordenacao")}
                            onChange={handleChange("ordenacao")}
                            className={
                              touched.alt && errors.alt ? "input-error" : "none"
                            }
                            autoComplete="alt"
                          />
                          {touched.ordenacao && errors.ordenacao ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.ordenacao}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol md="6">
                          <CLabel htmlFor="mala">É um submenu?</CLabel>
                          <CSelect
                            id="menu_pai"
                            name="menu_pai"
                            value={values.menu_pai}
                            onBlur={handleBlur("menu_pai")}
                            onChange={handleChange("menu_pai")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="6">
                          <CLabel htmlFor="">Permissão</CLabel>
                          <MultiSelect
                            options={Permissions}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                          />
                        </CCol>

                        <CCol md="6">
                          <CLabel htmlFor="ocultar">Ocultar</CLabel>
                          <CSelect
                            id="ocultar"
                            name="ocultar"
                            value={values.ocultar}
                            onBlur={handleBlur("ocultar")}
                            onChange={handleChange("ocultar")}
                            className={
                              touched.alt && errors.alt ? "input-error" : "none"
                            }
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>
                          {touched.ocultar && errors.ocultar ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.ocultar}
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

export default AddMenuItem;
