import React from "react";
import { History } from "history";
import CIcon from "@coreui/icons-react";
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
  CTextarea,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import Swal from "sweetalert2";

interface EditProfileProps {
  id: string;
  name: string;
  description: string;
  dataAgendamento: string;
  desconto: string;
  treatmentSalonId: string;
  userId: string;
  salonId: string;
  typeReservationId: string;
  statusReservationId: string;
  treatmentId: string;
  history: History;
}

const FormsAddReserva: React.FC<EditProfileProps> = ({ history }) => {
  const collapsed = React.useState(true);
  //eslint-disable-next-line

  async function handleSubmitEdit() {
    // e.preventDefault();
    Swal.fire("Actualizado!", "Perfil actualizado com sucesso.", "success");
    history.push("/profile/list");
  }
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Editar Perfil
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
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Nome do Salão: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="disabled-input" name="disabled-input" />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="disabled-input">
                        Categorias do Salão:{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect name="select" id="select">
                        <option value="0">Selecione, por favor</option>
                        <option value="0">Barbearia </option>
                        <option value="0">Salão de Bele</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="disabled-input">
                        Tipos de tratamentos:{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect name="select" id="select">
                        <option value="0">Selecione, por favor</option>
                        <option value="1">Manicure</option>
                        <option value="2">Pedicure</option>
                        <option value="2">Cortes Masculinos</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="disabled-input">
                        Dias de trabalho:{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect name="select" id="select">
                        <option value="0">Selecione, por favor</option>
                        <option value="1">Todos os dias</option>
                        <option value="2">Segunda à sexta</option>
                        <option value="2">Final de semana</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Horário de entrada/Saída: </CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      <CInput
                        type="time"
                        id="disabled-input"
                        name="disabled-input"
                      />
                    </CCol>
                    <CCol xs="12" md="5">
                      <CInput
                        type="time"
                        id="disabled-input"
                        name="disabled-input"
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Data de criação:</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="Data da criação do salão"
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Localização: </CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="Província"
                      />
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="Município"
                      />
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="Cidade ou Bairro"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Localização: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="Latitude, Longitude"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Contacto: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="disabled-input" name="disabled-input" />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>email: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="email"
                        id="disabled-input"
                        name="disabled-input"
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Sobre o salão </CLabel>
                    </CCol>
                    <CCol xs="24" md="9">
                      <CTextarea
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="Sobre o salão"
                      />
                    </CCol>
                  </CFormGroup>
                  <br />

                  <CButton onClick={() => handleSubmitEdit()}>
                    <CIcon name="cil-scrubber" /> Editar
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default FormsAddReserva;
