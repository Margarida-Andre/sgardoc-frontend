export type EstudanteProps = {
  id: string;
  matriculaId: string | null;
  usuarioId: string | null;
  cursoId: string;
  grauAcademicoId: string;
  turmaId: string;
  turnoId: any;
  numeroProcesso: any;
  descricao: string;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type EstudanteData = Omit<EstudanteProps, "id">;

export type EstudanteProviderProps = {
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

export type TurmaProps = {
  id: string;
  cursoId: string;
  grauAcademicoId: string;
  turnoId: any;
  designacao: string;
  descricao: string;
  inicioAnoLectivo: any;
  finalAnoLectivo: any;
};

export type TurnoProps = {
  id: string;
  cursoId: string;
  grauAcademicoId: string;
  turnoId: any;
  designacao: string;
  descricao: string;
  inicioAnoLectivo: any;
  finalAnoLectivo: any;
};
