export type PautaProps = {
  id: string;
  notaRecurso: any;
  mediaFinal: any;
  observacao: string;
  professorId: string | null;
  estudanteId: string | null;
  semestreId: string;
  disciplinaId: string | null;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type PautaData = Omit<PautaProps, "id">;

export type PautaProviderProps = {
  children: React.ReactNode;
};

export type SemestreProps = {
  id: any;
  designacao: string;
};
