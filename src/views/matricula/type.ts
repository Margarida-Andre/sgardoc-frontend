export type MatriculaProps = {
  id: string;
  inscricaoExameAcessoId: string | null;
  provinciaId: string;
  municipioId: string;
  estadoCivilId: string;
  generoId: string;
  cursoId: string;
  estadoId: number;
  nome: string;
  email: string;
  dataNascimento: string;
  numeroBi: string;
  dataEmissaoBi: string;
  validadeBi: string;
  arquivoIdentificacao: string;
  carregamentoBi: string | null;
  certificadoEnsinoMedio: string | null;
  carregamentoFotografia: string | null;
  comprovativoPagamento: string | null;
  telefonePrincipal: string;
  telefoneAlternativo: string;
  nomePai: string;
  nomeMae: string;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type MatriculaData = Omit<MatriculaProps, "id">;

export type MatriculaProviderProps = {
  children: React.ReactNode;
};
