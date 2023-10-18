import React, { useState, useEffect, useContext, createContext } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type CursoProps = {
  id: number;
  designacao: string;
};

type CursoProviderProps = {
  children: React.ReactNode;
};

type CursoContextData = {
  curso: CursoProps[];
};

const CursoContext = createContext<CursoContextData>({} as CursoContextData);

export function CursoProvider({ children }: CursoProviderProps) {
  const [curso, setCurso] = useState<CursoProps[]>([]);

  useEffect(() => {
    try {
      api.get("/cursoAll").then((response) => setCurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  return (
    <CursoContext.Provider value={{ curso }}>{children}</CursoContext.Provider>
  );
}

export function useCurso() {
  const context = useContext(CursoContext);
  return context;
}
