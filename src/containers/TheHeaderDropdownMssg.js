import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdownMssg = () => {
  const itemsCount = 4;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" />
        <CBadge shape="pill" color="info">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>Tens {itemsCount} messagens para responder</strong>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/7.jpg"}
                  className="c-avatar-img"
                  alt="admin@zuri-box.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Cliente</small>
              <small className="text-muted float-right mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Margarida
              André
            </div>
            <div className="small text-muted text-truncate">
              Olá! Gostaria de saber mais sobre o vosso salão, não tem muitas
              informações ...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/6.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Cliente</small>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div>
            <div className="text-truncate font-weight-bold">Goreth Manuel</div>
            <div className="small text-muted text-truncate">
              Gostaria de saber se têm uma vaga para hoje às 18h, tenho
              casamento mais tarde...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/5.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Cliente</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>

            <div className="text-truncate font-weight-bold">Juliana Soba</div>
            <div className="small text-muted text-truncate">
              Não recebi a confirmação da minha marcação para hoje às 19h,
              gostaria de obter..
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={"avatars/4.jpg"}
                  className="c-avatar-img"
                  alt="admin@zuri-box.com"
                />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Cliente</small>
              <small className="text-muted float-right mt-1">4:03 AM</small>
            </div>

            <div className="text-truncate font-weight-bold">Nica Katxabala</div>
            <div className="small text-muted text-truncate">
              Saudações! Quero passar a minha marcação para sábado, é
              possível?...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top">
          <strong>Ver todas mensagens</strong>

          <strong>View all messages</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
