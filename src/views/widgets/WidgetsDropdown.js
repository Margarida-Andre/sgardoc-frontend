import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CLink,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import api from "../../services/api";
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";
import { override } from "../../global";

const WidgetsDropdown = () => {
  const [curso, setCurso] = useState([]);
  const [estudante, setEstudante] = useState([]);
  const [matricula, setMatricula] = useState([]);
  const [declaracao, setDeclaracao] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      api.get("/cursoAll").then((response) => setCurso(response.data));
      setLoading(false);
    } catch (err) {
      Swal.fire("Ops!", err.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      api.get("/estudanteAll").then((response) => setEstudante(response.data));
      setLoading(false);
    } catch (err) {
      Swal.fire("Ops!", err.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      api.get("/matriculaAll").then((response) => setMatricula(response.data));
      setLoading(false);
    } catch (err) {
      Swal.fire("Ops!", err.message, "error");
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      api
        .get("/declaracaoAprovadas")
        .then((response) => setDeclaracao(response.data));
      setLoading(false);
    } catch (err) {
      Swal.fire("Ops!", err.message, "error");
    }
  }, []);

  return (
    <>
      {loading ? (
        <ScaleLoader
          color="#39f"
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <CRow>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-primary"
              header={estudante.length}
              text="Estudantes"
              footerSlot={
                <ChartLineSimple
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  style={{ height: "70px" }}
                  dataPoints={[20, 10, 15, 6, 19, 20, 18]}
                  pointHoverBackgroundColor="primary"
                  label="Usuários"
                  labels="months"
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Ver</CDropdownItem>
                  <CDropdownItem>Adicionar</CDropdownItem>
                  <CDropdownItem>Estatísticas</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-info"
              header={matricula.length}
              text="Matrículas"
              footerSlot={
                <ChartLineSimple
                  pointed
                  className="mt-3 mx-3"
                  style={{ height: "70px" }}
                  dataPoints={[5, 4, 5, 5, 3, 5, 5]}
                  pointHoverBackgroundColor="info"
                  options={{ elements: { line: { tension: 0.00001 } } }}
                  label="Produtos"
                  labels="months"
                />
              }
            >
              <CDropdown>
                <CDropdownToggle caret={false} color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Ver</CDropdownItem>
                  <CDropdownItem>Adicionar</CDropdownItem>
                  <CDropdownItem>Estatísticas</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-warning"
              header={curso.length}
              text="Cursos"
              footerSlot={
                <ChartLineSimple
                  className="mt-3"
                  style={{ height: "70px" }}
                  backgroundColor="rgba(255,255,255,.2)"
                  dataPoints={[15, 5, 7, 15, 10, 12, 14]}
                  options={{ elements: { line: { borderWidth: 2.5 } } }}
                  pointHoverBackgroundColor="warning"
                  label="Provas"
                  labels="months"
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>
                    <CLink href="/treatments/list" target="_blank">
                      Ver
                    </CLink>
                  </CDropdownItem>
                  <CDropdownItem>Adicionar</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-danger"
              header={declaracao.length}
              text="Requisições"
              footerSlot={
                <ChartBarSimple
                  className="mt-3 mx-3"
                  style={{ height: "70px" }}
                  backgroundColor="rgb(250, 152, 152)"
                  label="Ranking"
                  labels="months"
                />
              }
            >
              <CDropdown>
                <CDropdownToggle
                  caret
                  className="text-white"
                  color="transparent"
                >
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Ver</CDropdownItem>
                  <CDropdownItem>Adicionar</CDropdownItem>
                  <CDropdownItem disabled>Estatísticas</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default WidgetsDropdown;
