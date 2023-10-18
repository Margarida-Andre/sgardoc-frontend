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

export type InscricaoData = Omit<InscricaoProps, "id">;

export type InscricaoProviderProps = {
  children: React.ReactNode;
};
