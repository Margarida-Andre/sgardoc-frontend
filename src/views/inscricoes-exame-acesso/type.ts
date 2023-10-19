export type InscricaoProps = {
  id: string;
  provinciaId: string;
  municipioId: string;
  estadoCivilId: string;
  generoId: string;
  opcao1CursoId: string;
  opcao2CursoId: string;
  estadoId: number;
  nome: string;
  email: string;
  dataNascimento: string;
  numeroBi: string;
  dataEmissaoBi: string;
  validadeBi: string;
  arquivoIdentificacao: string;
  carregamentoBi: any;
  certificadoEnsinoMedio: any;
  carregamentoFotografia: any;
  comprovativoPagamento: any;
  telefonePrincipal: string;
  telefoneAlternativo: string;
  nomePai: string;
  nomeMae: string;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type InscricaoData = Omit<InscricaoProps, "id">;

export type InscricaoProviderProps = {
  children: React.ReactNode;
};

export type ProvinciaProps = {
  id: any;
  designacao: string;
};

export type MunicipioProps = {
  id: any;
  designacao: string;
};

export type EstadoCivilProps = {
  id: any;
  designacao: string;
};

export type CursoProps = {
  id: any;
  designacao: string;
};

export type GeneroProps = {
  id: any;
  designacao: string;
};
