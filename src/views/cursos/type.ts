export type CursoProps = {
  id: string;
  designacao: string;
  criadoPor: string | null;
  actualizadoPor: string | null;
};

export type CursoData = Omit<CursoProps, "id">;
