export type ArquivosProps = {
  ID_ARQUIVO: any;
  DS_ARQUIVO: string;
  DS_RESUMO: string;
  DS_DESCRICAO: string;
  CD_TIPO: any;
  DS_LINK_THUMBNAIL: string;
  DS_TEXTO_THUMBNAIL: string;
  DS_LINK_ARQUIVO: string;
  DS_TEXTO_LINK: string;
};

export type ArquivosData = Omit<ArquivosProps, "ID_ARQUIVO">;

export type ArquivosProviderProps = {
  children: React.ReactNode;
};
