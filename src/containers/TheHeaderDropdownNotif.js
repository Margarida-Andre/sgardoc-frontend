import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdownNotif = () => {
  const itemsCount = 5;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>Tens {itemsCount} notificações para vizualizar</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user-follow" className="mr-2 text-success" /> Novo
          funcionário cadastrado
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user-unfollow" className="mr-2 text-danger" />{" "}
          Usuário deletado
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-chart-pie" className="mr-2 text-info" /> O relatório
          dos produtos está pronto
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-basket" className="mr-2 text-primary" /> Novo
          agendamento
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-speedometer" className="mr-2 text-warning" />{" "}
          Serviços indisponíveis
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light">
          <strong>Servidor</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Utilização da CPU</b>
            </small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Utilização da memória</b>
            </small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Uso de SSD 1</b>
            </small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
