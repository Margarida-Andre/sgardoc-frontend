export type DeclaracaoProps = {
  id: string;
  estudanteId: string | null;
  grauAcademicoId: string;
  estadoId: number;
  email: string;
  telefonePrincipal: string;
  telefoneAlternativo: string;
  tipoDeclaracaoId: any;
  duracaoDeclaracaoId: any;
  efeitoDeclaracaoId: any;
  outroEfeito: string;
  comprovativoPagamento: any;
  criadoPor: string | null;
  actualizadoPor: string | null;
  cursoId: any;
};

export type DeclaracaoData = Omit<DeclaracaoProps, "id">;

export type DeclaracaoProviderProps = {
  children: React.ReactNode;
};

export type EfeitoProps = {
  id: any;
  efeito: string;
};

export type DuracaoProps = {
  id: any;
  duracao: string;
};

export type TipoProps = {
  id: any;
  tipo: string;
};

export type GrauProps = {
  id: any;
  descricao: string;
};
