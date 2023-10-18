import React, { useState } from "react";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CImg, CCollapse, CCardBody } from "@coreui/react";
import { usersTableFields } from "./tableSettins/fields";
import { NewAccountProps } from "../type";
import { useUser } from "src/hooks/useUsers";
import { useHistory } from "react-router-dom";
import UploadImg from "../../../assets/user-profile.png";

const ListUsers: React.FC<NewAccountProps> = () => {
  const [details, setDetails] = useState<any[]>([]);
  const { user } = useUser();
  const history = useHistory();

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

  async function update({ ID_USUARIO }: NewAccountProps) {
    localStorage.setItem("data-user", ID_USUARIO);
    history.push(`/users/edit/${ID_USUARIO}`);
  }

  async function detail({ ID_USUARIO }: NewAccountProps) {
    localStorage.setItem("data-datail", ID_USUARIO);
    history.push(`/users/details/${ID_USUARIO}`);
  }

  return (
    <>
      <PSTable
        title="Usuários Cadastrados"
        refresh={user}
        data={user}
        loading={false}
        fields={usersTableFields}
        itemsPerPage={5}
        linkAddNewRow="/users/add"
        scopedSlots={{
          DS_CAMINHO_FOTO: (item: any) => (
            <td>
              <div
                className="c-avatar"
                style={{ width: "40px", height: "40px" }}
              >
                <CImg
                  src={item.DS_CAMINHO_FOTO ? item.DS_CAMINHO_FOTO : UploadImg}
                  className="c-avatar-img"
                  alt="photo"
                  style={{ width: "100%", height: "100%" }}
                />
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
                    toggleDetails(item.ID_USUARIO);
                  }}
                >
                  {details.includes(item.ID_USUARIO) ? "Ocultar" : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.ID_USUARIO)}>
                <CCardBody>
                  <p className="text-muted">
                    Criado (a) desde: {item.createdAt}
                  </p>

                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => update(item)}
                  >
                    Editar
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() => detail(item)}
                  >
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

export default ListUsers;
