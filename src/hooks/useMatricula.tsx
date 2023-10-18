import React, { useState, useEffect, useContext, createContext } from "react";
import {
  MatriculaProviderProps,
  InscricaoProps,
  InscricaoData,
} from "../views/matricula/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type MatriculaContextData = {
  matricula: InscricaoProps[];
  createMatricula: (data: InscricaoData) => Promise<void>;
  deleteInscricao: (data: InscricaoData) => Promise<void>;
  updateInscricao: (data: InscricaoData) => Promise<void>;
};

const MatriculaContext = createContext<MatriculaContextData>(
  {} as MatriculaContextData
);

export function MatriculaProvider({ children }: MatriculaProviderProps) {
  const [matricula, setMatricula] = useState<InscricaoProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/matriculasAprovadas")
        .then((response) => setMatricula(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createMatricula(data: InscricaoData) {
    const result = await api.post("/matriculaCreate", data);
    Swal.fire("Inscrito (a)!", "Matrícula feita com sucesso", "success");
    setMatricula([...matricula, result.data]);
    api
      .get("/inscricoesAprovadas")
      .then((response) => setMatricula(response.data));
    console.log(result.data);
  }

  async function updateInscricao(data: InscricaoData) {
    const id = localStorage.getItem("data-inscricao");
    const result = await api.patch(`/inscricaoUpdate/${id}`, data);
    Swal.fire("Editado!", "Inscrição editada com sucesso", "success");
    setMatricula([...matricula, result.data]);
    api
      .get("/inscricoesAprovadas")
      .then((response) => setMatricula(response.data));
    console.log(result.data);
  }

  async function deleteInscricao(params: any) {
    try {
      const id = params?.id;
      const result = await api.get(`/inscricaoDelete${id}`);
      Swal.fire("Deletado!", "Inscrição excluída com sucesso.", "success");
      const response = matricula.filter((data) => data.id !== id);
      setMatricula(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  return (
    <MatriculaContext.Provider
      value={{ matricula, createMatricula, updateInscricao, deleteInscricao }}
    >
      {children}
    </MatriculaContext.Provider>
  );
}

export function useMatricula() {
  const context = useContext(MatriculaContext);
  return context;
}
