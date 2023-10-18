import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { TableProps } from "./types";

const PSTable: FC<TableProps> = (
  {
    data = [],
    fields = [],
    title = "Tabela",
    dark,
    border,
    linkAddNewRow,
    scopedSlots,
    itemsPerPage,
    refresh,
  },
  props: { onClick: () => void }
) => {
  const [filteredData, setFilteredData] = useState(data);
  //eslint-disable-next-line
  const [filterBy, setFilterBy] = useState("");

  const searchBy = (e: any) => {
    const { value } = e.target;
    const newData = filteredData?.filter(
      (item, index) =>
        String(item[filterBy])
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) > -1
    );
    setFilteredData(newData);
  };

  return (
    <>
      <CCard>
        <CCardHeader
          style={{
            backgroundColor: "#39f",
            color: "white",
            fontSize: "1rem",
          }}
        >
          Dados de Pesquisa
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol xs="5">
                <CLabel htmlFor="selectSm">Filtrar por</CLabel>
                <CSelect
                  name="selectSm"
                  id="SelectLm"
                  onChange={(e) => console.log(e)}
                >
                  <option value="null">Por favor, selecciona</option>
                  {fields?.map((item, index) => (
                    <option key={index} value={item}>
                      {item.label}
                    </option>
                  ))}
                  /
                </CSelect>
              </CCol>
              <CCol xs="7">
                <CLabel htmlFor="pesq">Pesquisar</CLabel>
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="Search"
                    id="pesq"
                    style={{ width: "80%" }}
                    onChange={searchBy}
                  />
                  <CButton color="info" className="my-2 my-sm-0" type="submit">
                    Search
                  </CButton>
                </CForm>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CForm>
                <CRow>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 0.5rem",
                      }}
                    >
                      <CButton
                        type="button"
                        color="warning"
                        className="my-2 my-sm-0"
                        onClick={refresh}
                      >
                        Refresh
                      </CButton>

                      <Link
                        to={linkAddNewRow || ""}
                        style={{
                          marginLeft: "0.6rem",
                        }}
                      >
                        <CButton
                          type="button"
                          color="success"
                          className="my-2 my-sm-0"
                        >
                          Adicionar Novo
                        </CButton>
                      </Link>
                    </div>
                  </div>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardBody>
              <CDataTable
                items={data}
                fields={fields}
                clickableRows
                border={border}
                itemsPerPageSelect
                dark={dark}
                itemsPerPage={itemsPerPage}
                pagination
                hover
                scopedSlots={scopedSlots}
                tableFilter={{
                  placeholder: "filtrar",
                  label: "Pesquisar:",
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export { PSTable };
