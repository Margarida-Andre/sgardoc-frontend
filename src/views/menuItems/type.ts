export type MenuItemsProps = {
  ID_MENU_PRINCIPAL: any;
  DS_TEXTO_MENU: string;
  DS_LINK_MENU: string;
  DS_IMAGEM: string;
  CD_OCULTAR_SE_NAO_HOUVER_PERMISSAO: any;
  DS_TEXTO_ALT: string;
  DS_TIPO_PERMISSAO: any;
  ID_MENU_PAI: any;
  CD_ORDENACAO: any;
};

export type MenuItemsProviderProps = {
  children: React.ReactNode;
};
