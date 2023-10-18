import React, { useState, useEffect } from "react";
import { History } from "history";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFade,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import Swal from "sweetalert2";
import api from "../../../services/api";
import schema from "./schema";
import { Formik, Form } from "formik";

const styles = {
  width: "100%",
  height: "auto",
  backgroundColor: "red",
  color: "#fff",
  border: "1px solid red",
  opacity: 0.8,
  padding: "8px",
  display: "flex",
  flex: "diretion",
  justifyContent: "center",
  marginTop: "5px",
  fontWeight: 400,
};

interface EditProfileProps {
  id: string;
  name: string;
  email: string;
  nif: string;
  owner: string;
  category: string;
  latitude: string;
  longitude: string;
  date: any;
  pronvice: string;
  description: string;
  aboutSalon: string;
  history: History;
}

const FormsAddFuncionario: React.FC<EditProfileProps> = ({
  history,
  name,
  nif,
  email,
  owner,
  category,
  latitude,
  longitude,
  pronvice,
  date,
  aboutSalon,
  description,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  //const [showElements, setShowElements] = useState(true);
  const [salonCategory, setSalonCategory] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [municipes, setMunicipes] = useState([]);
  const [enderecoId, setEnderecoId] = useState("");

  //Pegando os dados da API
  useEffect(() => {
    async function Getcategory() {
      const response = await api.get("/category");
      setSalonCategory(response.data);
    }
    Getcategory();
  }, []);
  useEffect(() => {
    async function GetProvince() {
      const response = await api.get("/province");
      setProvinces(response.data);
    }
    GetProvince();
  }, []);

  useEffect(() => {
    async function GetMunicipe() {
      const response = await api.get("/municipe");
      setMunicipes(response.data);
    }
    GetMunicipe();
  }, []);

  //Actualizando os dados da API
  function onSubmit(values: any, actions: any) {
    async function PutSalonName() {
      const salonId = localStorage.getItem("salonId");
      const response = await api.put(`entity/${salonId}`, {
        name,
        dateborn: date,
        nif,
      });
      setEnderecoId(response.data.enderecoId);
    }
    PutSalonName();

    async function PutSalonLocation() {
      await api.put(`address/${enderecoId}`, {
        longitude,
        latitude,
        /*provinciaId,
        municipioId,
        destritoId,*/
      });
    }
    PutSalonLocation();

    /*async function PutSalonEmail(){
      const response = await api.put(`contact/${contactId}`, {
        content: email,
      } );
      setEnderecoId(response.data.enderecoId)
    }
    PutSalonEmail()*/

    console.log("onSubmit", values);
    Swal.fire("Editado!", "Perfil editado com sucesso.", "success");
  }
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={true} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Editar Salão
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
                  onSubmit={onSubmit}
                  validationSchema={schema}
                  initialValues={{
                    name: "",
                    category: "",
                    date: "",
                    nif: "",
                    contacto: "",
                    email: "",
                    province: "",
                    municipe: "",
                    city: "",
                    latitude: "",
                    longitude: "",
                    aboutSalon: "",
                  }}
                  render={({
                    values,
                    handleSubmit,
                    handleChange,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Nome do Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="name"
                            name="name"
                            required
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Digite o nome  do salão"
                          />
                          {errors.name ? (
                            <div style={styles}>{errors.name} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="nif">NIF do Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="nif"
                            name="nif"
                            required
                            value={values.nif}
                            onChange={handleChange}
                            placeholder="Digite o NIF do salão"
                          />
                          {errors.nif ? (
                            <div style={styles}>{errors.nif} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="category">Categoria do salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CSelect
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={values.category}
                            disabled
                          >
                            <option value="0">Por favor, seleccione</option>

                            {salonCategory.map(
                              ({ id, description }: EditProfileProps) => (
                                <option key={id} value={id}>
                                  {description}
                                </option>
                              )
                            )}
                          </CSelect>
                          {errors.category && (
                            <div style={styles}> {errors.category}</div>
                          )}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="owner">
                            Data de criação do Salão
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={values.date}
                            onChange={handleChange}
                            placeholder="Digite o nome do proprietário do salão"
                            disabled
                          />
                          {errors.date ? (
                            <div style={styles}>{errors.date} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="province">
                            Localização do salão
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="3">
                          <CSelect
                            id="province"
                            name="province"
                            onChange={handleChange}
                            value={values.province}
                          >
                            <option value="0">província</option>
                            {provinces.map(
                              ({ id, description }: EditProfileProps) => (
                                <option key={id} value={id}>
                                  {description}
                                </option>
                              )
                            )}
                          </CSelect>
                          {errors.province && (
                            <div style={styles}> {errors.province}</div>
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          <CSelect
                            id="municipe"
                            name="municipe"
                            onChange={handleChange}
                            value={values.municipe}
                          >
                            <option value="0">município</option>
                            {municipes.map(
                              ({ id, description }: EditProfileProps) => (
                                <option key={id} value={id}>
                                  {description}
                                </option>
                              )
                            )}
                          </CSelect>
                          {errors.municipe && (
                            <div style={styles}> {errors.municipe}</div>
                          )}
                        </CCol>
                        <CCol xs="12" md="3">
                          <CInput
                            id="city"
                            name="city"
                            required
                            value={values.city}
                            onChange={handleChange}
                            placeholder="Cidade  do salão"
                          />
                          {errors.city ? (
                            <div style={styles}>{errors.city} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Localização do Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            id="latitude"
                            name="latitude"
                            required
                            value={values.latitude}
                            onChange={handleChange}
                            placeholder="Digite a latitude  do salão"
                          />
                          {errors.latitude ? (
                            <div style={styles}>{errors.latitude} </div>
                          ) : null}
                        </CCol>
                        <CCol xs="12" md="4">
                          <CInput
                            id="longitude"
                            name="longitude"
                            required
                            value={values.longitude}
                            onChange={handleChange}
                            placeholder="Digite a longitude  do salão"
                          />
                          {errors.longitude ? (
                            <div style={styles}>{errors.longitude} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="email">Email do Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="email"
                            name="email"
                            required
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Digite o email  do salão"
                          />
                          {errors.email ? (
                            <div style={styles}>{errors.email} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="contacto">Contacto do Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput
                            id="contacto"
                            name="contacto"
                            required
                            value={values.contacto}
                            onChange={handleChange}
                            placeholder="Digite o contacto  do salão"
                          />
                          {errors.contacto ? (
                            <div style={styles}>{errors.contacto} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="aboutSalon">Sobre o Salão</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            id="aboutSalon"
                            name="aboutSalon"
                            required
                            value={values.aboutSalon}
                            onChange={handleChange}
                            placeholder="Sobre o salão"
                          ></CTextarea>
                          {errors.aboutSalon ? (
                            <div style={styles}>{errors.aboutSalon} </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <br />
                      <CButton
                        type="submit"
                        size="sm"
                        color="primary"
                        disabled={!isValid}
                      >
                        <CIcon name="cil-scrubber" /> Editar
                      </CButton>
                    </Form>
                  )}
                />
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default FormsAddFuncionario;
