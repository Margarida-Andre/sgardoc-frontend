import React, { useState } from "react";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CImg, CCollapse, CCardBody } from "@coreui/react";
import { usersTableFields } from "./tableSettins/fields";
import { MenuItemsProps } from "../type";
import { useMenu } from "src/hooks/useMenu";

const ListMenuItem: React.FC<MenuItemsProps> = () => {
  const [details, setDetails] = useState<any[]>([]);
  const { menu } = useMenu();

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  return (
    <>
      <PSTable
        refresh={menu}
        title="Itens do Menu Cadastrados"
        data={menu}
        loading={false}
        fields={usersTableFields}
        itemsPerPage={5}
        linkAddNewRow="/menuItem/add"
        scopedSlots={{
          image: (item: any) => (
            <td>
              <div className="c-avatar">
                <CImg src={item.image} className="c-avatar-img" alt="photo" />
              </div>
            </td>
          ),

          actions: (item: any) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    toggleDetails(item.id);
                  }}
                >
                  {details.includes(item.id) ? "Ocultar" : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.id)}>
                <CCardBody>
                  <p className="text-muted">
                    Criado (a) desde: {item.createdAt}
                  </p>

                  <CButton size="sm" color="warning">
                    Editar
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Apagar
                  </CButton>
                  <CButton size="sm" color="success" className="ml-1">
                    Ver mais detalhes
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListMenuItem;
