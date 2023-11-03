export type TurmaProps = {
  id: string;
  cursoId: string;
  grauAcademicoId: string;
  turnoId: any;
  designacao: string;
  descricao: string;
  inicioAnoLectivo: string;
  finalAnoLectivo: string;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type TurmaData = Omit<TurmaProps, "id">;

export type TurmaProviderProps = {
  children: React.ReactNode;
};

export type CursoProps = {
  id: any;
  designacao: string;
};

export type GrauProps = {
  id: any;
  cursoId: string;
  grau: any;
  descricao: string;
};

export type TurnoProps = {
  id: string;
  designacao: string;
};
