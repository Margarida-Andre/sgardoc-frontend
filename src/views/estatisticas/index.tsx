import CIcon from "@coreui/icons-react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import { CChartDoughnut, CChartBar } from "@coreui/react-chartjs";
import BalancoGeral from "../charts/MainChartExample.js";

export default function Estatisticas() {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Balanço Geral
              </h4>
              <div className="small text-muted">Dezembro 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Day", "Month", "Year"].map((value) => (
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
          <BalancoGeral style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Reservas</div>
              <strong>29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Clientes</div>
              <strong>24.093 Usuários (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Vizualização</div>
              <strong>78.706 (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Novos usuários</div>
              <strong>22.123 (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Produtos</div>
              <strong>29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <div className="d-flex justify-content-between">
        <CCard style={{ width: "48.5%" }}>
          <CCardHeader>Tratamentos mais solicitados</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: ["#41B883", "#3b3b98", "#00D8FF", "#DD1B16"],
                  data: [40, 20, 80, 10],
                },
              ]}
              labels={[
                "Tranças de mão",
                "Big Afro",
                "Corte americano",
                "Fitagem",
              ]}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
            />
          </CCardBody>
        </CCard>

        <CCard style={{ width: "48%" }}>
          <CCardHeader>Produtos mais usados em tratamentos</CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: "Produto",
                  backgroundColor: "#f87979",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 15, 30, 10],
                },
              ]}
              labels={[
                "Jan",
                "Fev",
                "Mar",
                "Apr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Out",
                "Nov",
                "Dez",
              ]}
            />
          </CCardBody>
        </CCard>
      </div>
    </>
  );
}
