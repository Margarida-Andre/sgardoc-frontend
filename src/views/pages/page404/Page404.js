import React from "react";
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const history = useHistory();
  function back() {
    history.push("/login");
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="text-center">
              <img
                src="/avatars/page-not-found.png"
                alt="logo"
                width="200px"
                height="200px"
              />
            </div>
            <div className="clearfix" color="primary">
              <h4 className="pt-3 text-center">Ops! Você está perdido.</h4>
              <p className="text-muted text-center">
                A página que você procura não foi encontrada.
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                size="16"
                type="text"
                placeholder="O que você está procurando?"
              />
              <CInputGroupAppend>
                <CButton color="info">Busca</CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CRow>
        <div
          className="d-flex flex-row justify-content-center"
          style={{ marginTop: "2rem" }}
        >
          <CButton color="info" onClick={back}>
            Voltar para a página inicial
          </CButton>
        </div>
      </CContainer>
    </div>
  );
};

export default Page404;
