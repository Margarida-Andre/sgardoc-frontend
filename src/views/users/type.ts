export type NewAccountProps = {
  ID_USUARIO: any;
  DS_NOME: string;
  DS_EMAIL: string;
  DS_SENHA: string;
  DS_SENHA_CONFIRMACAO: string;
  DS_TELEFONE: string;
  DS_CPF: string;
  DS_CEP: string;
  DS_ENDERECO: string;
  DS_COMPLEMENTO: string;
  DS_CAMINHO_FOTO: string;
  CD_ACEITA_MALA_DIRETA: string;
  CD_ONLINE: any;
  CD_STATUS: string;
  DT_ULTIMO_ACESSO: string;

  CD_FORMA_PAGAMENTO: string;
  DS_TITULAR_CARTAO: string;
  DS_CPF_CARTAO: string;
  DS_VALIDADE: string;
  DS_NUMERO_CARTAO: string;
  DS_CODIGO_VERIFICACAO: string;
};

export type NewAccountEditProps = {
  USUARIO_ALTERANDO: any;
  USUARIO_ALTERADO: any;
  DS_NOME: string;
  CD_ACEITA_MALA_DIRETA: string;
  CD_STATUS: string;
  DS_CPF: string;
  DS_CEP: string;
  DS_ENDERECO: string;
  DS_COMPLEMENTO: string;
  DS_TELEFONE: string;
  DS_CAMINHO_FOTO: string;
};

export type NewAccountData = Omit<NewAccountProps, "ID_USUARIO">;

export type NewAccountProviderProps = {
  children: React.ReactNode;
};
