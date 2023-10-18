import CIcon from "@coreui/icons-react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import {
  CTableRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableHead,
} from "@coreui/react-pro";
import React, { lazy } from "react";
import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Balanço Diário
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Dia"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Estudantes</div>
              <strong>29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Matrículas</div>
              <strong>29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Inscrições de exame de acesso</div>
              <strong>29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Requisição de documentos</div>
              <strong>24.093 Usuários (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h5 id="users" className="card-title mb-0">
                Novos Usuários
              </h5>
              <br />
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead style={{ backgroundColor: "#39f", color: "white" }}>
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Endereço</CTableHeaderCell>
                  <CTableHeaderCell>CPF</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody></CTableBody>
            </CTable>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
