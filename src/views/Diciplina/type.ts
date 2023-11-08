export type DisciplinaProps = {
  id: string;
  designacao: string;
  descricao: string;
  semestreId: any;
  grauAcademicoId: any;
  criadoPor: string | null;
  actualizadoPor: string | null;
  cursoId: any;
};

export type DisciplinaData = Omit<DisciplinaProps, "id">;
